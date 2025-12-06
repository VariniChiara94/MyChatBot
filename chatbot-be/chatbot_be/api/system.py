from fastapi import APIRouter, Depends, Response
from chatbot_be.config import Settings, get_settings
from chatbot_be.models.commons import AppResponse
from chatbot_be.utils import status_code

system_router = APIRouter(
    prefix="/api/system",
    tags=["system"],
)


@system_router.get("/info")
def info(settings: Settings = Depends(get_settings)) -> AppResponse[dict]:
    """Get some Service System Info."""

    data_response = {"env": settings.env, "app_name": settings.configs["app_name"]}
    return AppResponse(data=data_response,
                       details="endpoint /api/info endend successfully",
                       app_status_code=status_code.APP_200_OK)


@system_router.get("/health")
def health(
    response: Response,
    settings: Settings = Depends(get_settings),
) -> AppResponse[str]:
    """Health Check Endpoint."""
    return AppResponse(data="System app and running",
                       details="endpoint /api/health endend successfully",
                       app_status_code=status_code.APP_200_OK)
