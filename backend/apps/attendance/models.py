import uuid
from django.db import models
from apps.academics.models import Subject, Faculty, Course, Student

class AttendanceSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    subject = models.ForeignKey(Subject, on_delete=models.RESTRICT)
    faculty = models.ForeignKey(Faculty, on_delete=models.RESTRICT)
    course = models.ForeignKey(Course, on_delete=models.RESTRICT)
    semester = models.IntegerField()
    section = models.CharField(max_length=10)
    session_date = models.DateField()
    session_number = models.IntegerField()
    topic = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('subject', 'session_date', 'session_number', 'semester', 'section')

    def __str__(self):
        return f"{self.subject.code} - {self.session_date} (Session {self.session_number})"

class AttendanceRecord(models.Model):
    class Status(models.TextChoices):
        PRESENT = 'PRESENT', 'Present'
        ABSENT = 'ABSENT', 'Absent'
        LATE = 'LATE', 'Late'
        EXCUSED = 'EXCUSED', 'Excused'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    attendance_session = models.ForeignKey(AttendanceSession, on_delete=models.CASCADE, related_name='records')
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=Status.choices)
    remarks = models.TextField(null=True, blank=True)
    marked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('attendance_session', 'student')

    def __str__(self):
        return f"{self.student.roll_number} - {self.status}"
