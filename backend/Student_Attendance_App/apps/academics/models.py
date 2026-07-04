from django.conf import settings
from django.db import models


class Department(models.Model):
    """A department can have many courses. Department code must be unique."""
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.code} - {self.name}'


class Course(models.Model):
    """A course belongs to one department. Course code must be unique."""
    department = models.ForeignKey(
        Department, on_delete=models.CASCADE, related_name='courses'
    )
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.code} - {self.name}'


class Subject(models.Model):
    """A subject belongs to one course and one semester."""
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='subjects'
    )
    semester = models.PositiveSmallIntegerField()
    code = models.CharField(max_length=20)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('course', 'semester', 'code')

    def __str__(self):
        return f'{self.code} - {self.name} (Sem {self.semester})'


class Student(models.Model):
    """
    A student belongs to one department and one course.
    Roll number and email must be unique.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile'
    )
    department = models.ForeignKey(
        Department, on_delete=models.PROTECT, related_name='students'
    )
    course = models.ForeignKey(
        Course, on_delete=models.PROTECT, related_name='students'
    )
    roll_number = models.CharField(max_length=30, unique=True)
    email = models.EmailField(unique=True)
    semester = models.PositiveSmallIntegerField()
    section = models.CharField(max_length=10)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.roll_number} - {self.user.get_full_name() or self.user.username}'


class Faculty(models.Model):
    """
    A faculty member belongs to one department.
    Employee code and email must be unique.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='faculty_profile'
    )
    department = models.ForeignKey(
        Department, on_delete=models.PROTECT, related_name='faculty_members'
    )
    employee_code = models.CharField(max_length=30, unique=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.employee_code} - {self.user.get_full_name() or self.user.username}'


class FacultySubject(models.Model):
    """
    A faculty member can be assigned to multiple subjects.
    Faculty, subject, and academic year should be unique together —
    this is what "Faculty can mark attendance only for assigned subjects" is checked against.
    """
    faculty = models.ForeignKey(
        Faculty, on_delete=models.CASCADE, related_name='assigned_subjects'
    )
    subject = models.ForeignKey(
        Subject, on_delete=models.CASCADE, related_name='assigned_faculty'
    )
    academic_year = models.CharField(max_length=9)  # e.g. "2025-2026"
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('faculty', 'subject', 'academic_year')

    def __str__(self):
        return f'{self.faculty} -> {self.subject} ({self.academic_year})'