from rest_framework import serializers

from .models import AttendanceSession, AttendanceRecord


class AttendanceSessionSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(
        source="subject.name", read_only=True
    )
    faculty_name = serializers.SerializerMethodField()
    course_name = serializers.CharField(
        source="course.name", read_only=True
    )

    class Meta:
        model = AttendanceSession
        fields = (
            "id",
            "subject",
            "subject_name",
            "faculty",
            "faculty_name",
            "course",
            "course_name",
            "semester",
            "section",
            "date",
            "session_number",
            "created_at",
        )
        read_only_fields = ("id", "created_at")

    def get_faculty_name(self, obj):
        return obj.faculty.user.get_full_name() or obj.faculty.user.username


class AttendanceRecordSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    roll_number = serializers.CharField(
        source="student.roll_number", read_only=True
    )
    marked_by_username = serializers.CharField(
        source="marked_by.username", read_only=True
    )

    class Meta:
        model = AttendanceRecord
        fields = (
            "id",
            "session",
            "student",
            "student_name",
            "roll_number",
            "status",
            "marked_by",
            "marked_by_username",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )

    def get_student_name(self, obj):
        return obj.student.user.get_full_name() or obj.student.user.username

    def validate(self, attrs):
        """
        Prevent duplicate attendance records for the same
        student in the same session.
        """
        session = attrs.get("session")
        student = attrs.get("student")

        if self.instance is None:
            if AttendanceRecord.objects.filter(
                session=session,
                student=student
            ).exists():
                raise serializers.ValidationError(
                    "Attendance has already been marked for this student in this session."
                )

        return attrs