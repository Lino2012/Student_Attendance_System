import uuid
from django.db import models
from apps.accounts.models import User

class Department(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.code})"

class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    department = models.ForeignKey(Department, on_delete=models.RESTRICT, related_name='courses')
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    duration_years = models.IntegerField()
    total_semesters = models.IntegerField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.code})"

class Student(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    department = models.ForeignKey(Department, on_delete=models.RESTRICT)
    course = models.ForeignKey(Course, on_delete=models.RESTRICT)
    roll_number = models.CharField(max_length=50, unique=True)
    semester = models.IntegerField()
    section = models.CharField(max_length=10)
    phone = models.CharField(max_length=20, null=True, blank=True)
    admission_year = models.IntegerField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.name} - {self.roll_number}"

class Faculty(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='faculty_profile')
    department = models.ForeignKey(Department, on_delete=models.RESTRICT)
    employee_code = models.CharField(max_length=50, unique=True)
    designation = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.name} ({self.employee_code})"

class Subject(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    department = models.ForeignKey(Department, on_delete=models.RESTRICT)
    course = models.ForeignKey(Course, on_delete=models.RESTRICT)
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50)
    semester = models.IntegerField()
    credits = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('course', 'code')

    def __str__(self):
        return f"{self.name} ({self.code})"

class FacultySubject(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='assigned_subjects')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    academic_year = models.CharField(max_length=20)

    class Meta:
        unique_together = ('faculty', 'subject', 'academic_year')

    def __str__(self):
        return f"{self.faculty.user.name} - {self.subject.name} ({self.academic_year})"
