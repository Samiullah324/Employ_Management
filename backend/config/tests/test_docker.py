from pathlib import Path

from django.test import SimpleTestCase


REPO_ROOT = Path(__file__).resolve().parents[3]


class DockerSmokeTests(SimpleTestCase):
    def test_dockerfile_exists(self):
        self.assertTrue((REPO_ROOT / "Dockerfile").is_file())

    def test_docker_compose_exists(self):
        self.assertTrue((REPO_ROOT / "docker-compose.yml").is_file())

    def test_dockerignore_exists(self):
        self.assertTrue((REPO_ROOT / ".dockerignore").is_file())

    def test_entrypoint_exists(self):
        self.assertTrue((REPO_ROOT / "docker" / "entrypoint.sh").is_file())

    def test_compose_defines_db_and_web_services(self):
        compose = (REPO_ROOT / "docker-compose.yml").read_text()
        self.assertIn("db:", compose)
        self.assertIn("web:", compose)
        self.assertIn("postgres:16-alpine", compose)

    def test_compose_configures_healthchecks(self):
        compose = (REPO_ROOT / "docker-compose.yml").read_text()
        self.assertGreaterEqual(compose.count("healthcheck:"), 2)

    def test_compose_configures_volumes(self):
        compose = (REPO_ROOT / "docker-compose.yml").read_text()
        self.assertIn("postgres_data:", compose)
        self.assertIn("static_volume:", compose)
        self.assertIn("media_volume:", compose)

    def test_env_example_documents_docker_db_host(self):
        env_example = (REPO_ROOT / ".env.example").read_text()
        self.assertIn("DB_HOST", env_example)
        self.assertIn("docker-compose", env_example.lower())
