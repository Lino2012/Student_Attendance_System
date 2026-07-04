from rest_framework import serializers
from apps.accounts.models import User
from apps.accounts.serializers import UserSerializer
from .models import Department, Course, Student, Faculty, Subject, FacultySubject
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source="department.name", read_only=True)

    class Meta:
        model = Course
        fields = "__all__"


class SubjectSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source="department.name", read_only=True)
    course_name = serializers.CharField(source="course.name", read_only=True)

    class Meta:
        model = Subject
        fields = "__all__"


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    name = serializers.CharField(write_only=True, required=False)
    email = serializers.EmailField(write_only=True, required=False)
    password = serializers.CharField(write_only=True, required=False, default="Student@123")

    department_name = serializers.CharField(source="department.name", read_only=True)
    course_name = serializers.CharField(source="course.name", read_only=True)

    class Meta:
        model = Student
        fields = [
            "id",
            "user",
            "name",
            "email",
            "password",
            "department",
            "department_name",
            "course",
            "course_name",
            "roll_number",
            "semester",
            "section",
            "phone",
            "admission_year",
            "is_active",
        ]

    def create(self, validated_data):
        name = validated_data.pop("name")
        email = validated_data.pop("email")
        password = validated_data.pop("password", "Student@123")

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=name,
            role="STUDENT",
        )

        student = Student.objects.create(user=user, **validated_data)
        return student


class FacultySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    name = serializers.CharField(write_only=True, required=False)
    email = serializers.EmailField(write_only=True, required=False)
    password = serializers.CharField(write_only=True, required=False, default="Faculty@123")

    department_name = serializers.CharField(source="department.name", read_only=True)

    class Meta:
        model = Faculty
        fields = [
            "id",
            "user",
            "name",
            "email",
            "password",
            "department",
            "department_name",
            "employee_code",
            "designation",
            "phone",
            "is_active",
        ]

    def create(self, validated_data):
        name = validated_data.pop("name")
        email = validated_data.pop("email")
        password = validated_data.pop("password", "Faculty@123")

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=name,
            role="FACULTY",
        )

        faculty = Faculty.objects.create(user=user, **validated_data)
        return faculty


class FacultySubjectSerializer(serializers.ModelSerializer):
    faculty_name = serializers.CharField(source="faculty.user.first_name", read_only=True)
    subject_name = serializers.CharField(source="subject.name", read_only=True)
    subject_code = serializers.CharField(source="subject.code", read_only=True)

    class Meta:
        model = FacultySubject
        fields = "__all__"