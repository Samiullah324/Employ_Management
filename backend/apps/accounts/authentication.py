from datetime import timedelta

from django.conf import settings
from rest_framework_simplejwt.tokens import AccessToken


def create_access_token_for_user(user):
    """Generate a JWT containing user id, email, and role."""
    token = AccessToken.for_user(user)
    token["email"] = user.email
    token["role"] = user.role
    lifetime = settings.SIMPLE_JWT.get("ACCESS_TOKEN_LIFETIME", timedelta(hours=24))
    token.set_exp(lifetime=lifetime)
    return token
