from rest_framework.permissions import BasePermission
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from rest_framework.exceptions import APIException


class IsAuthenticatedCustom(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            exception = APIException({"401": "Unauthorized"})
            exception.status_code = status.HTTP_401_UNAUTHORIZED
            raise exception
        return True


class IsNotAuthenticated(BasePermission):

    def has_permission(self, request, view):
        return not request.user or not request.user.is_authenticated
