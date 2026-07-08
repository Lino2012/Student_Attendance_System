from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttendanceSessionViewSet, AttendanceRecordUpdateView, StudentAttendanceSummaryView

router = DefaultRouter()
router.register(r'sessions', AttendanceSessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('records/<str:pk>', AttendanceRecordUpdateView.as_view()),
    path('student/<str:studentId>', StudentAttendanceSummaryView.as_view()),
]
