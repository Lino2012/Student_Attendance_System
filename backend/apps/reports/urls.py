from django.urls import path
from .views import AttendanceReportView, MonthlyReportView, PDFExportView, ExcelExportView

urlpatterns = [
    path('attendance', AttendanceReportView.as_view(), name='attendance_report'),
    path('monthly', MonthlyReportView.as_view(), name='monthly_report'),
    path('export/pdf', PDFExportView.as_view(), name='export_pdf'),
    path('export/excel', ExcelExportView.as_view(), name='export_excel'),
]
