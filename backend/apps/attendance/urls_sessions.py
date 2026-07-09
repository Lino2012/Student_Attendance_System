from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttendanceSessionViewSet

router = DefaultRouter()
router.register(r'', AttendanceSessionViewSet, basename='attendance-sessions')

urlpatterns = [
    path('', include(router.urls)),
]
