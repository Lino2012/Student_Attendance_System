from django.contrib import admin
from .models import User, AuditLog

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'role', 'is_active')
    search_fields = ('name', 'email')
    list_filter = ('role', 'is_active')

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('action', 'entity_name', 'user', 'created_at')
    search_fields = ('action', 'entity_name')
    list_filter = ('action', 'entity_name')
