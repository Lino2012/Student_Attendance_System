from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Q, F
from django.conf import settings
from django.http import HttpResponse
from common.utils import success_response
from common.permissions import IsAdmin, IsFacultyOrAdmin, IsOwnerOrAdmin
from apps.attendance.models import AttendanceSession, AttendanceRecord
from apps.academics.models import Student
import io

class BaseReportView(APIView):
    permission_classes = [IsFacultyOrAdmin]

    def get_attendance_data(self, request):
        course_id = request.query_params.get('courseId')
        semester = request.query_params.get('semester')
        subject_id = request.query_params.get('subjectId')
        from_date = request.query_params.get('from')
        to_date = request.query_params.get('to')

        records = AttendanceRecord.objects.all()

        if course_id: records = records.filter(attendance_session__course_id=course_id)
        if semester: records = records.filter(attendance_session__semester=semester)
        if subject_id: records = records.filter(attendance_session__subject_id=subject_id)
        if from_date: records = records.filter(attendance_session__session_date__gte=from_date)
        if to_date: records = records.filter(attendance_session__session_date__lte=to_date)

        late_as_present = getattr(settings, 'LATE_COUNTS_AS_PRESENT', True)
        
        present_q = Q(status='PRESENT')
        if late_as_present:
            present_q |= Q(status='LATE')

        summary = records.values(
            'student__id', 'student__roll_number', 'student__user__name'
        ).annotate(
            total_sessions=Count('id'),
            present_count=Count('id', filter=present_q),
            absent_count=Count('id', filter=Q(status='ABSENT')),
            late_count=Count('id', filter=Q(status='LATE')),
            excused_count=Count('id', filter=Q(status='EXCUSED'))
        )
        
        result = []
        for s in summary:
            total = s['total_sessions']
            present = s['present_count']
            percentage = (present / total * 100) if total > 0 else 0
            
            result.append({
                "studentId": s['student__id'],
                "rollNumber": s['student__roll_number'],
                "name": s['student__user__name'],
                "totalSessions": total,
                "presentCount": present,
                "absentCount": s['absent_count'],
                "lateCount": s['late_count'],
                "excusedCount": s['excused_count'],
                "percentage": round(percentage, 2)
            })
            
        return result

class AttendanceReportView(BaseReportView):
    def get(self, request):
        data = self.get_attendance_data(request)
        return success_response(data=data)

class MonthlyReportView(APIView):
    permission_classes = [IsFacultyOrAdmin]

    def get(self, request):
        month = request.query_params.get('month')
        year = request.query_params.get('year')
        course = request.query_params.get('course')
        semester = request.query_params.get('semester')
        subject = request.query_params.get('subject')
        
        if not (month and year):
            return success_response(message="Month and year required", status=400)
            
        sessions = AttendanceSession.objects.filter(session_date__month=month, session_date__year=year)
        if course: sessions = sessions.filter(course_id=course)
        if semester: sessions = sessions.filter(semester=semester)
        if subject: sessions = sessions.filter(subject_id=subject)
        
        # Get all records for these sessions
        records = AttendanceRecord.objects.filter(attendance_session__in=sessions).select_related('student__user', 'attendance_session')
        
        # Group by student
        student_data = {}
        for record in records:
            student_id = record.student.id
            if student_id not in student_data:
                student_data[student_id] = {
                    "studentId": student_id,
                    "rollNumber": record.student.roll_number,
                    "name": record.student.user.name,
                    "attendance": {}
                }
            
            # Map date to status
            date_str = record.attendance_session.session_date.strftime('%Y-%m-%d')
            student_data[student_id]["attendance"][date_str] = record.status
            
        return success_response(data=list(student_data.values()), message="Monthly report generated successfully")


class PDFExportView(BaseReportView):
    def get(self, request):
        from reportlab.lib.pagesizes import letter
        from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
        from reportlab.lib import colors
        from reportlab.lib.styles import getSampleStyleSheet

        data = self.get_attendance_data(request)

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        elements = []
        
        styles = getSampleStyleSheet()
        elements.append(Paragraph("Institution Name", styles['Heading1']))
        elements.append(Paragraph("Attendance Report", styles['Heading2']))
        elements.append(Spacer(1, 12))
        
        table_data = [["Roll No", "Name", "Total", "Present", "Absent", "Percentage"]]
        for row in data:
            table_data.append([
                row['rollNumber'], row['name'], str(row['totalSessions']),
                str(row['presentCount']), str(row['absentCount']), f"{row['percentage']}%"
            ])
            
        t = Table(table_data)
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.grey),
            ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0,0), (-1,0), 12),
            ('BACKGROUND', (0,1), (-1,-1), colors.beige),
            ('GRID', (0,0), (-1,-1), 1, colors.black)
        ]))
        elements.append(t)
        doc.build(elements)
        
        pdf = buffer.getvalue()
        buffer.close()
        
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="attendance_report.pdf"'
        response.write(pdf)
        return response

class ExcelExportView(BaseReportView):
    def get(self, request):
        import openpyxl
        
        data = self.get_attendance_data(request)
        
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Attendance Report"
        
        headers = ["Roll No", "Name", "Total Sessions", "Present", "Absent", "Late", "Excused", "Percentage"]
        ws.append(headers)
        
        for row in data:
            ws.append([
                row['rollNumber'], row['name'], row['totalSessions'],
                row['presentCount'], row['absentCount'], row['lateCount'],
                row['excusedCount'], row['percentage']
            ])
            
        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename="attendance_report.xlsx"'
        wb.save(response)
        return response
