from django.contrib import admin
from .models import Department, Course, Student, Faculty, Subject, FacultySubject

admin.site.register(Department)
admin.site.register(Course)
admin.site.register(Student)
admin.site.register(Faculty)
admin.site.register(Subject)
admin.site.register(FacultySubject)
