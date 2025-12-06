import pytest
from chatbot_be.config import get_settings
from chatbot_be.main import app
from starlette import status
from starlette.testclient import TestClient
from tests import get_settings_override


@pytest.fixture()
def client():
    """Fixture to have FastAPI Test Client."""

    with TestClient(app) as test_client:
        app.dependency_overrides[get_settings] = get_settings_override
        yield test_client


def test_system_info_http_call(client):
    """Test Info endpoint."""

    response = client.get("/api/system/info")
    assert response.status_code == status.HTTP_200_OK

    data = response.json()["data"]
    assert data == {"env": "test", "app_name": "test-chatbot-be"}


def test_system_health_http_call(client, mocker):
    """Test Health endpoint."""

    response = client.get("/api/system/health")
    assert response.status_code == status.HTTP_200_OK
