"""DRF permission helpers."""
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminUserOrReadOnly(BasePermission):
    """Allow read for anyone; write only for staff/admin."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.is_staff
        )

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class IsStaffWrite(BasePermission):
    """Require authenticated staff for any access (admin CRUD)."""

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.is_staff
        )

    def has_object_permission(self, request, view, obj):
        return bool(request.user and request.user.is_staff)


class IsOwnerOrReadOnly(BasePermission):
    """Allow read for anyone; write only for owner/admin."""

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)
