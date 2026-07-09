from django import forms
from django.contrib import admin
from .models import User, AuditLog


class UserAdminForm(forms.ModelForm):
    """
    Plain admin.ModelAdmin binds the password field directly to the model,
    which saves it as PLAINTEXT (no set_password call). This form hashes
    whatever is typed in the password box before saving, and lets the field
    be left blank on edit to keep the existing password unchanged.
    """
    password = forms.CharField(
        widget=forms.PasswordInput,
        required=False,
        help_text="Enter a new password to set/change it. Leave blank to keep the current password unchanged.",
    )

    class Meta:
        model = User
        fields = '__all__'

    def save(self, commit=True):
        user = super().save(commit=False)
        raw_password = self.cleaned_data.get('password')
        if raw_password:
            user.set_password(raw_password)
        if commit:
            user.save()
        return user


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    form = UserAdminForm
    list_display = ('name', 'email', 'role', 'is_active')
    search_fields = ('name', 'email')
    list_filter = ('role', 'is_active')


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('action', 'entity_name', 'user', 'created_at')
    search_fields = ('action', 'entity_name')
    list_filter = ('action', 'entity_name')