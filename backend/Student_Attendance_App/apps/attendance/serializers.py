from rest_framework import serializers
from .models import AttendanceSession, AttendanceRecord


class AttendanceRecordInputSerializer(serializers.Serializer):
    student_id = serializers.UUIDField()
    status = serializers.ChoiceField(
        choices=["PRESENT", "ABSENT", "LATE", "EXCUSED"]
    )
    remarks = serializers.CharField(required=False, allow_blank=True)


class AttendanceSessionCreateSerializer(serializers.Serializer):
    subject = serializers.UUIDField()
    course = serializers.UUIDField()
    semester = serializers.IntegerField()
    section = serializers.CharField()
    session_date = serializers.DateField()
    session_number = serializers.IntegerField()
    topic = serializers.CharField(required=False, allow_blank=True)
    records = AttendanceRecordInputSerializer(many=True)

    def validate_records(self, records):
        if not records:
            raise serializers.ValidationError("At least one attendance record is required.")

        student_ids = [record["student_id"] for record in records]

        if len(student_ids) != len(set(student_ids)):
            raise serializers.ValidationError("Duplicate student records are not allowed.")

        return records


class AttendanceRecordSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source="student.user.first_name", read_only=True)
    roll_number = serializers.CharField(source="student.roll_number", read_only=True)

    class Meta:
        model = AttendanceRecord
        fields = [
            "id",
            "attendance_session",
            "student",
            "student_name",
            "roll_number",
            "status",
            "remarks",
            "marked_at",
        ]


class AttendanceSessionSerializer(serializers.ModelSerializer):
    records = AttendanceRecordSerializer(many=True, read_only=True)

    subject_name = serializers.CharField(source="subject.name", read_only=True)
    subject_code = serializers.CharField(source="subject.code", read_only=True)
    faculty_name = serializers.CharField(source="faculty.user.first_name", read_only=True)
    course_name = serializers.CharField(source="course.name", read_only=True)

    class Meta:
        model = AttendanceSession
        fields = [
            "id",
            "subject",
            "subject_name",
            "subject_code",
            "faculty",
            "faculty_name",
            "course",
            "course_name",
            "semester",
            "section",
            "session_date",
            "session_number",
            "topic",
            "created_at",
            "records",
        ]