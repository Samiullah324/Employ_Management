from django.urls import path

from apps.accounts.views import LoginView, ProfileView

app_name = "auth"

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", ProfileView.as_view(), name="profile"),
]
