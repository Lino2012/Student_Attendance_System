from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from common.permissions import IsAdmin, IsFacultyOrAdmin, IsOwnerOrAdmin
from common.utils import success_response
from .models import Department, Course, Student, Faculty, Subject, FacultySubject
from .serializers import (
    DepartmentSerializer, CourseSerializer, StudentSerializer,
    FacultySerializer, SubjectSerializer, FacultySubjectSerializer
)

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [] # Any authenticated user can view (default IsAuthenticated applies from settings)
        return [IsAdmin()]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.courses.exists() or instance.student_set.exists() or instance.faculty_set.exists():
            return success_response(message="Cannot delete department with linked entities.", status=400)
        return super().destroy(request, *args, **kwargs)

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return []
        return [IsAdmin()]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.student_set.filter(is_active=True).exists():
            return success_response(message="Cannot delete course with active students.", status=400)
        return super().destroy(request, *args, **kwargs)

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return []
        return [IsAdmin()]

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdmin()]
        elif self.action == 'retrieve':
            return [IsOwnerOrAdmin()]
        return [IsFacultyOrAdmin()]

    def get_queryset(self):
        queryset = super().get_queryset()
        department = self.request.query_params.get('department')
        course = self.request.query_params.get('course')
        semester = self.request.query_params.get('semester')
        section = self.request.query_params.get('section')
        search = self.request.query_params.get('search')
        
        if department: queryset = queryset.filter(department_id=department)
        if course: queryset = queryset.filter(course_id=course)
        if semester: queryset = queryset.filter(semester=semester)
        if section: queryset = queryset.filter(section=section)
        if search:
            queryset = queryset.filter(Q(user__name__icontains=search) | Q(roll_number__icontains=search))
        
        return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return success_response(message="Student deactivated successfully.")

class FacultyViewSet(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer

    def get_permissions(self):
        if self.action == 'retrieve':
            return [IsOwnerOrAdmin()]
        return [IsAdmin()]

    @action(detail=True, methods=['post'], permission_classes=[IsAdmin])
    def subjects(self, request, pk=None):
        faculty = self.get_object()
        subject_id = request.data.get('subject_id')
        academic_year = request.data.get('academic_year')
        
        if not subject_id or not academic_year:
            return success_response(message="subject_id and academic_year required", status=400)
            
        try:
            subject = Subject.objects.get(id=subject_id)
            fs, created = FacultySubject.objects.get_or_create(
                faculty=faculty, subject=subject, academic_year=academic_year
            )
            if not created:
                return success_response(message="Subject already assigned for this year.", status=409)
            return success_response(data=FacultySubjectSerializer(fs).data, message="Subject assigned.")
        except Subject.DoesNotExist:
            return success_response(message="Subject not found.", status=404)
