from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.db import transaction
from django.db.models import Count, Q
from common.permissions import IsAdmin, IsFacultyOrAdmin, IsOwnerOrAdmin
from common.utils import success_response
from apps.accounts.models import AuditLog
from apps.academics.models import FacultySubject, Subject, Course, Student
from .models import AttendanceSession, AttendanceRecord
from .serializers import AttendanceSessionSerializer, AttendanceRecordSerializer
import json

class AttendanceSessionViewSet(viewsets.ModelViewSet):
    queryset = AttendanceSession.objects.all()
    serializer_class = AttendanceSessionSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [IsFacultyOrAdmin()]
        elif self.action in ['list', 'retrieve']:
            return [] # Handled by queryset / token
        return [IsAdmin()]

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Faculty can only see their own sessions
        if not self.request.user.is_admin and self.request.user.is_faculty:
            queryset = queryset.filter(faculty__user=self.request.user)
            
        subject = self.request.query_params.get('subject')
        date = self.request.query_params.get('date')
        course = self.request.query_params.get('course')
        section = self.request.query_params.get('section')
        
        if subject: queryset = queryset.filter(subject_id=subject)
        if date: queryset = queryset.filter(session_date=date)
        if course: queryset = queryset.filter(course_id=course)
        if section: queryset = queryset.filter(section=section)
        
        return queryset

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        data = request.data
        subject_id = data.get('subjectId')
        course_id = data.get('courseId')
        semester = data.get('semester')
        section = data.get('section')
        session_date = data.get('sessionDate')
        session_number = data.get('sessionNumber')
        topic = data.get('topic')
        records_data = data.get('records', [])

        if not all([subject_id, course_id, semester, section, session_date, session_number]):
            return success_response(message="Missing required session fields", status=400)

        # Ensure faculty is assigned to the subject
        if request.user.is_faculty:
            faculty = request.user.faculty_profile
            is_assigned = FacultySubject.objects.filter(faculty=faculty, subject_id=subject_id).exists()
            if not is_assigned:
                return success_response(message="You are not assigned to mark attendance for this subject", status=403)
        else:
            # If admin is creating, need to specify faculty in data or use default (not recommended)
            # Assuming data contains facultyId
            from apps.academics.models import Faculty
            faculty_id = data.get('facultyId')
            if not faculty_id: return success_response(message="facultyId is required for admin", status=400)
            faculty = Faculty.objects.get(id=faculty_id)

        # Check for duplicates
        if AttendanceSession.objects.filter(
            subject_id=subject_id, session_date=session_date, 
            session_number=session_number, semester=semester, section=section
        ).exists():
            return success_response(message="Attendance session already exists for this slot.", status=409)

        # Create Session
        session = AttendanceSession.objects.create(
            subject_id=subject_id,
            faculty=faculty,
            course_id=course_id,
            semester=semester,
            section=section,
            session_date=session_date,
            session_number=session_number,
            topic=topic
        )

        # Create Records
        record_instances = []
        for r in records_data:
            # Check if student is active
            student = Student.objects.get(id=r.get('studentId'))
            if not student.is_active: continue
            
            record_instances.append(AttendanceRecord(
                attendance_session=session,
                student=student,
                status=r.get('status'),
                remarks=r.get('remarks', '')
            ))
            
        AttendanceRecord.objects.bulk_create(record_instances)
        
        serializer = self.get_serializer(session)
        return success_response(data=serializer.data, message="Attendance marked successfully", status=201)

class AttendanceRecordUpdateView(APIView):
    permission_classes = [IsFacultyOrAdmin]

    @transaction.atomic
    def put(self, request, pk):
        try:
            record = AttendanceRecord.objects.select_related('attendance_session__faculty__user').get(pk=pk)
            
            if request.user.is_faculty and record.attendance_session.faculty.user != request.user:
                return success_response(message="Not authorized to edit this record.", status=403)

            old_status = record.status
            new_status = request.data.get('status')
            remarks = request.data.get('remarks', record.remarks)
            
            if not new_status:
                return success_response(message="Status is required", status=400)

            record.status = new_status
            record.remarks = remarks
            record.save()
            
            # Write to audit log
            AuditLog.objects.create(
                user=request.user,
                action='UPDATE_ATTENDANCE_RECORD',
                entity_name='AttendanceRecord',
                entity_id=str(record.id),
                old_value=json.dumps({"status": old_status}),
                new_value=json.dumps({"status": new_status})
            )
            
            return success_response(data=AttendanceRecordSerializer(record).data, message="Record updated successfully.")
        except AttendanceRecord.DoesNotExist:
            return success_response(message="Record not found", status=404)

class StudentAttendanceSummaryView(APIView):
    # Admin, Faculty, or the student themselves
    
    def get(self, request, studentId):
        try:
            student = Student.objects.select_related('user').get(id=studentId)
            
            # Check permissions
            if request.user.is_student and request.user != student.user:
                return success_response(message="Cannot view other student's attendance", status=403)
                
            records = AttendanceRecord.objects.filter(student=student)
            
            summary = records.values('attendance_session__subject__name').annotate(
                total=Count('id'),
                present=Count('id', filter=Q(status='PRESENT')),
                absent=Count('id', filter=Q(status='ABSENT')),
                late=Count('id', filter=Q(status='LATE')),
                excused=Count('id', filter=Q(status='EXCUSED'))
            )
            
            return success_response(data=list(summary))
        except Student.DoesNotExist:
            return success_response(message="Student not found", status=404)
