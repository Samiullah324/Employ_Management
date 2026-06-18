from rest_framework import serializers

from apps.accounts.models import User


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False)
    username = serializers.EmailField(required=False)
    password = serializers.CharField(required=True, write_only=True, trim_whitespace=False)

    def validate(self, attrs):
        email = attrs.get("email") or attrs.get("username")
        password = attrs.get("password")

        if not email:
            raise serializers.ValidationError(
                {"email": "Email or username is required."}
            )
        if not password:
            raise serializers.ValidationError(
                {"password": "Password is required."}
            )

        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials") from None

        if not user.is_active or not user.check_password(password):
            raise serializers.ValidationError("Invalid credentials")

        attrs["user"] = user
        return attrs


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "role", "is_active", "created_at", "updated_at")
        read_only_fields = fields
