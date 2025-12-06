from fastapi import Response, status
from chatbot_be.api.system import health, info
from tests import get_settings_override


def test_system_info_function():
    """Test Info function."""

    payload = info(settings=get_settings_override())
    expected_payload = {
        "details": "endpoint /api/info endend successfully",
        "app_status_code": 200,
        "data": {
            "env": "test",
            "app_name": "test-chatbot-be"
        }
    }
    assert payload.model_dump() == expected_payload


def test_system_health_function(mocker):
    """Test Health function."""

    response = Response()
    payload = health(response=response, settings=get_settings_override())

    assert response.status_code == status.HTTP_200_OK
    expected_payload = {
        "details": "endpoint /api/health endend successfully",
        "app_status_code": 200,
        "data": "System app and running"
    }
    assert payload.model_dump() == expected_payload
