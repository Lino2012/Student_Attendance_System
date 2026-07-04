from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import (
    Department,
    Course,
    Subject,
    Student,
    Faculty,
    FacultySubject,
)

User = get_user_model()


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"
        read_only_fields = ("id", "created_at")


class CourseSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(
        source="department.name", read_only=True
    )

    class Meta:
        model = Course
        fields = (
            "id",
            "department",
            "department_name",
            "code",
            "name",
            "created_at",
        )
        read_only_fields = ("id", "created_at")


class SubjectSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(
        source="course.name", read_only=True
    )

    class Meta:
        model = Subject
        fields = (
            "id",
            "course",
            "course_name",
            "semester",
            "code",
            "name",
            "created_at",
        )
        read_only_fields = ("id", "created_at")


class StudentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source="user.username", read_only=True
    )
    full_name = serializers.SerializerMethodField()
    department_name = serializers.CharField(
        source="department.name", read_only=True
    )
    course_name = serializers.CharField(
        source="course.name", read_only=True
    )

    class Meta:
        model = Student
        fields = (
            "id",
            "user",
            "username",
            "full_name",
            "department",
            "department_name",
            "course",
            "course_name",
            "roll_number",
            "email",
            "semester",
            "section",
            "is_active",
            "created_at",
        )
        read_only_fields = ("id", "created_at")

    def get_full_name(self, obj):
        return obj.user.get_full_name() or obj.user.username


class FacultySerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source="user.username", read_only=True
    )
    full_name = serializers.SerializerMethodField()
    department_name = serializers.CharField(
        source="department.name", read_only=True
    )

    class Meta:
        model = Faculty
        fields = (
            "id",
            "user",
            "username",
            "full_name",
            "department",
            "department_name",
            "employee_code",
            "email",
            "is_active",
            "created_at",
        )
        read_only_fields = ("id", "created_at")

    def get_full_name(self, obj):
        return obj.user.get_full_name() or obj.user.username


class FacultySubjectSerializer(serializers.ModelSerializer):
    faculty_name = serializers.SerializerMethodField()
    subject_name = serializers.CharField(
        source="subject.name", read_only=True
    )

    class Meta:
        model = FacultySubject
        fields = (
            "id",
            "faculty",
            "faculty_name",
            "subject",
            "subject_name",
            "academic_year",
            "created_at",
        )
        read_only_fields = ("id", "created_at")

    def get_faculty_name(self, obj):
        return obj.faculty.user.get_full_name() or obj.faculty.user.username