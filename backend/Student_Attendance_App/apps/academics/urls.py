from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DepartmentViewSet,
    CourseViewSet,
    StudentViewSet,
    FacultyViewSet,
    SubjectViewSet,
    FacultySubjectViewSet,
)

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'students', StudentViewSet)
router.register(r'faculty', FacultyViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'faculty-subjects', FacultySubjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
