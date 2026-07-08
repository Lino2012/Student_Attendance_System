from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_admin)

class IsFaculty(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_faculty)

class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_student)

class IsFacultyOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and (request.user.is_faculty or request.user.is_admin))

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object (student looking at their own profile/attendance) or admins to edit/view it.
    Requires the view to correctly pass the user_id or student_id to check against.
    """
    def has_object_permission(self, request, view, obj):
        if request.user.is_admin:
            return True
        
        # Depending on the model, it might be related differently. 
        # For a User object:
        if hasattr(obj, 'email') and hasattr(obj, 'role'):
            return obj == request.user
            
        # For a Student object:
        if hasattr(obj, 'user'):
            return obj.user == request.user
            
        # For AttendanceRecord:
        if hasattr(obj, 'student'):
            return obj.student.user == request.user
            
        return False
