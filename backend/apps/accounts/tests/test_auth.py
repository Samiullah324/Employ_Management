from datetime import timedelta

from django.test import TestCase, override_settings
from django.urls import path
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.test import APIClient, APIRequestFactory, APITestCase
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken

from apps.accounts.models import Role, User
from apps.accounts.permissions import require_roles


class ProtectedRoleView(APIView):
    permission_classes = [IsAuthenticated, require_roles(Role.SUPER_ADMIN)]

    def get(self, request):
        return Response({"ok": True})


urlpatterns = [
    path("test-protected-role/", ProtectedRoleView.as_view()),
]


@override_settings(ROOT_URLCONF=__name__)
class AuthenticationMiddlewareTests(APITestCase):
    urlpatterns = urlpatterns

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(
            email="admin@example.com",
            password="securepass123",
            role=Role.SUPER_ADMIN,
        )

    def setUp(self):
        self.client = APIClient()

    def test_valid_token_allows_authenticated_request(self):
        token = AccessToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get("/test-protected-role/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_missing_token_returns_401(self):
        response = self.client.get("/test-protected-role/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_invalid_token_returns_401(self):
        self.client.credentials(HTTP_AUTHORIZATION="Bearer invalid.token.value")
        response = self.client.get("/test-protected-role/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class LoginEndpointTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(
            email="employee@example.com",
            password="correct-password",
            role=Role.EMPLOYEE,
        )

    def setUp(self):
        self.client = APIClient()
        self.login_url = "/api/v1/auth/login/"

    def test_login_with_valid_credentials(self):
        response = self.client.post(
            self.login_url,
            {"email": "employee@example.com", "password": "correct-password"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)
        self.assertEqual(response.data["user"]["email"], "employee@example.com")
        self.assertEqual(response.data["user"]["role"], Role.EMPLOYEE)
        self.assertNotIn("password", response.data["user"])

    def test_login_with_username_alias(self):
        response = self.client.post(
            self.login_url,
            {"username": "employee@example.com", "password": "correct-password"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)

    def test_login_with_invalid_credentials(self):
        response = self.client.post(
            self.login_url,
            {"email": "employee@example.com", "password": "wrong-password"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data, {"error": "Invalid credentials"})

    def test_login_with_missing_fields(self):
        response = self.client.post(self.login_url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)


class ProfileEndpointTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(
            email="profile@example.com",
            password="securepass123",
            role=Role.HR_MANAGER,
        )

    def setUp(self):
        self.client = APIClient()
        self.profile_url = "/api/v1/auth/profile/"

    def test_profile_with_valid_token(self):
        token = AccessToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], "profile@example.com")
        self.assertEqual(response.data["role"], Role.HR_MANAGER)
        self.assertNotIn("password", response.data)

    def test_profile_without_token(self):
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_profile_with_expired_token(self):
        token = AccessToken.for_user(self.user)
        token.set_exp(lifetime=timedelta(seconds=-1))
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


@override_settings(ROOT_URLCONF=__name__)
class AuthorizationMiddlewareTests(APITestCase):
    urlpatterns = urlpatterns

    @classmethod
    def setUpTestData(cls):
        cls.super_admin = User.objects.create_user(
            email="super@example.com",
            password="securepass123",
            role=Role.SUPER_ADMIN,
        )
        cls.employee = User.objects.create_user(
            email="emp@example.com",
            password="securepass123",
            role=Role.EMPLOYEE,
        )

    def setUp(self):
        self.client = APIClient()

    def test_correct_role_is_allowed(self):
        token = AccessToken.for_user(self.super_admin)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get("/test-protected-role/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_insufficient_role_returns_403(self):
        token = AccessToken.for_user(self.employee)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get("/test-protected-role/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class RequireRolesPermissionTests(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.permission = require_roles(Role.SUPER_ADMIN, Role.HR_MANAGER)()
        self.view = ProtectedRoleView.as_view()

    def test_permission_allows_matching_role(self):
        user = User(email="hr@example.com", role=Role.HR_MANAGER)
        request = self.factory.get("/")
        request.user = user
        self.assertTrue(self.permission.has_permission(request, None))

    def test_permission_denies_non_matching_role(self):
        user = User(email="emp@example.com", role=Role.EMPLOYEE)
        request = self.factory.get("/")
        request.user = user
        self.assertFalse(self.permission.has_permission(request, None))
