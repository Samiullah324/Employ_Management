from rest_framework.permissions import BasePermission


class RequireRoles(BasePermission):
    """Allow access only when the authenticated user has one of the given roles."""

    allowed_roles = ()

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return request.user.role in self.allowed_roles


def require_roles(*roles):
    """Factory for route-level role restrictions."""

    class _RolePermission(RequireRoles):
        allowed_roles = roles

    return _RolePermission
