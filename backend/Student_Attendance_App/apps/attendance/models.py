from django.conf import settings
from django.db import models

from apps.academics.models import Course, Faculty, Student, Subject


class AttendanceSession(models.Model):
    """
    One session = one subject, taught on one date, at one session number,
    for one semester + section.

    Business rule: duplicate attendance for the same subject, date, session
    number, semester, and section is not allowed -> enforced via unique_together.
    """
    subject = models.ForeignKey(
        Subject, on_delete=models.PROTECT, related_name='attendance_sessions'
    )
    faculty = models.ForeignKey(
        Faculty, on_delete=models.PROTECT, related_name='attendance_sessions'
    )
    course = models.ForeignKey(
        Course, on_delete=models.PROTECT, related_name='attendance_sessions'
    )
    semester = models.PositiveSmallIntegerField()
    section = models.CharField(max_length=10)
    date = models.DateField()
    session_number = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('subject', 'date', 'session_number', 'semester', 'section')

    def __str__(self):
        return f'{self.subject} | {self.date} | Session {self.session_number}'


class AttendanceRecord(models.Model):
    """
    One record = one student's status within one AttendanceSession.

    Business rule: a student can have only one attendance record per
    session -> enforced via unique_together on (session, student).
    """

    class Status(models.TextChoices):
        PRESENT = 'PRESENT', 'Present'
        ABSENT = 'ABSENT', 'Absent'
        LATE = 'LATE', 'Late'
        EXCUSED = 'EXCUSED', 'Excused'

    session = models.ForeignKey(
        AttendanceSession, on_delete=models.CASCADE, related_name='records'
    )
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name='attendance_records'
    )
    status = models.CharField(max_length=10, choices=Status.choices)
    marked_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True,
        related_name='attendance_marked'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('session', 'student')

    def __str__(self):
        return f'{self.student} - {self.status} ({self.session})'

