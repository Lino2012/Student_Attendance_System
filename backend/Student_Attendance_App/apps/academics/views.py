from django.contrib.auth import get_user_model
from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import (
    Department,
    Course,
    Subject,
    Student,
    Faculty,
    FacultySubject,
)
from .serializers import (
    DepartmentSerializer,
    CourseSerializer,
    SubjectSerializer,
    StudentSerializer,
    FacultySerializer,
    FacultySubjectSerializer,
)

User = get_user_model()


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        # Extract frontend fields
        roll_number = request.data.get("roll_number")
        email = request.data.get("email")
        semester = request.data.get("semester", 1)
        section = request.data.get("section", "A")

        if not roll_number or not email:
            return Response(
                {"detail": "Roll number and email are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Resolve department (default if not sent)
        dep_id = request.data.get("department")
        if not dep_id:
            dep, _ = Department.objects.get_or_create(
                code="GEN", defaults={"name": "General Department"}
            )
            dep_id = dep.id
        else:
            dep = Department.objects.get(id=dep_id)

        # Resolve course (default if not sent)
        course_id = request.data.get("course")
        if not course_id:
            course, _ = Course.objects.get_or_create(
                code="GEN-CSE",
                department_id=dep_id,
                defaults={"name": "General Course"},
            )
            course_id = course.id

        # Create/Get underlying User
        username = roll_number
        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                "email": email,
                "role": User.Role.STUDENT,
                "first_name": "Student",
                "last_name": roll_number,
            },
        )
        if created:
            user.set_password(roll_number)
            user.save()

        # Create Student profile
        student, s_created = Student.objects.get_or_create(
            user=user,
            defaults={
                "department_id": dep_id,
                "course_id": course_id,
                "roll_number": roll_number,
                "email": email,
                "semester": semester,
                "section": section,
            },
        )
        if not s_created:
            student.department_id = dep_id
            student.course_id = course_id
            student.roll_number = roll_number
            student.email = email
            student.semester = semester
            student.section = section
            student.save()

        serializer = self.get_serializer(student)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()

        user = instance.user
        email = request.data.get("email", instance.email)
        roll_number = request.data.get("roll_number", instance.roll_number)

        # Update linked User details
        user.email = email
        user.username = roll_number
        user.save()

        # Populate request fields to satisfy serializer
        data = request.data.copy()
        if "user" not in data:
            data["user"] = user.id
        if "department" not in data:
            data["department"] = instance.department.id
        if "course" not in data:
            data["course"] = instance.course.id

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class FacultyViewSet(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        employee_code = request.data.get("employee_code")
        email = request.data.get("email")

        if not employee_code or not email:
            return Response(
                {"detail": "Employee code and email are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Resolve department (default if not sent)
        dep_id = request.data.get("department")
        if not dep_id:
            dep, _ = Department.objects.get_or_create(
                code="GEN", defaults={"name": "General Department"}
            )
            dep_id = dep.id

        # Create/Get underlying User
        username = employee_code
        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                "email": email,
                "role": User.Role.FACULTY,
                "first_name": "Faculty",
                "last_name": employee_code,
            },
        )
        if created:
            user.set_password(employee_code)
            user.save()

        # Create Faculty profile
        faculty, f_created = Faculty.objects.get_or_create(
            user=user,
            defaults={
                "department_id": dep_id,
                "employee_code": employee_code,
                "email": email,
            },
        )
        if not f_created:
            faculty.department_id = dep_id
            faculty.employee_code = employee_code
            faculty.email = email
            faculty.save()

        serializer = self.get_serializer(faculty)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()

        user = instance.user
        email = request.data.get("email", instance.email)
        employee_code = request.data.get("employee_code", instance.employee_code)

        # Update linked User details
        user.email = email
        user.username = employee_code
        user.save()

        # Populate request fields to satisfy serializer
        data = request.data.copy()
        if "user" not in data:
            data["user"] = user.id
        if "department" not in data:
            data["department"] = instance.department.id

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        course_val = request.data.get("course")
        course_obj = None

        if isinstance(course_val, int) or (
            isinstance(course_val, str) and course_val.isdigit()
        ):
            course_obj = Course.objects.filter(id=int(course_val)).first()

        if not course_obj:
            dep, _ = Department.objects.get_or_create(
                code="GEN", defaults={"name": "General Department"}
            )
            code = str(course_val) if course_val else "GEN-COURSE"
            course_obj, _ = Course.objects.get_or_create(
                code=code,
                defaults={"name": f"Course {code}", "department": dep},
            )

        data = request.data.copy()
        data["course"] = course_obj.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FacultySubjectViewSet(viewsets.ModelViewSet):
    queryset = FacultySubject.objects.all()
    serializer_class = FacultySubjectSerializer
    permission_classes = [IsAuthenticated]
