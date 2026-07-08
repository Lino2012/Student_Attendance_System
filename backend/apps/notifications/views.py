from rest_framework import viewsets, status
from rest_framework.decorators import action
from common.utils import success_response
from .models import Notification
from .serializers import NotificationSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    
    def get_queryset(self):
        # Only return current user's notifications
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')

    @action(detail=True, methods=['put'])
    def read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        return success_response(data=NotificationSerializer(notification).data, message="Notification marked as read")
