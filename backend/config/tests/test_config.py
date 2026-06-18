from django.test import SimpleTestCase, override_settings
from django.urls import resolve


class ConfigSmokeTests(SimpleTestCase):
    def test_admin_url_resolves(self):
        match = resolve("/admin/")
        self.assertEqual(match.view_name, "admin:index")

    def test_api_schema_url_resolves(self):
        match = resolve("/api/schema/")
        self.assertEqual(match.view_name, "schema")

    def test_api_docs_url_resolves(self):
        match = resolve("/api/docs/")
        self.assertEqual(match.view_name, "swagger-ui")

    def test_api_v1_namespace_registered(self):
        from config.urls import urlpatterns

        v1_patterns = [
            p for p in urlpatterns if getattr(p, "namespace", None) == "v1"
        ]
        self.assertEqual(len(v1_patterns), 1)
        self.assertEqual(v1_patterns[0].pattern._route, "api/v1/")

    @override_settings(
        DATABASES={
            "default": {
                "ENGINE": "django.db.backends.postgresql",
                "NAME": "test_db",
                "USER": "test_user",
                "PASSWORD": "test_pass",
                "HOST": "localhost",
                "PORT": "5432",
            }
        }
    )
    def test_database_engine_is_postgresql(self):
        from django.conf import settings

        self.assertEqual(
            settings.DATABASES["default"]["ENGINE"],
            "django.db.backends.postgresql",
        )

    def test_rest_framework_installed(self):
        from django.conf import settings

        self.assertIn("rest_framework", settings.INSTALLED_APPS)
        self.assertIn("corsheaders", settings.INSTALLED_APPS)
        self.assertIn("drf_spectacular", settings.INSTALLED_APPS)

    def test_cors_middleware_first(self):
        from django.conf import settings

        self.assertEqual(
            settings.MIDDLEWARE[0],
            "corsheaders.middleware.CorsMiddleware",
        )
