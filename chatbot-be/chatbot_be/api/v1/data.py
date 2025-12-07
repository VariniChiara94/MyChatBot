import os

from fastapi import APIRouter, Depends
from starlette.responses import FileResponse

from chatbot_be.config import Settings, get_settings

data_router = APIRouter(
    prefix="/api/v1/data",
    tags=["data"],
)


@data_router.get("/get/{file_name}")
async def get_file(
        filename: str,
        settings: Settings = Depends(get_settings)):

    file_path = os.path.join(settings.data_folder+"/resources", filename)
    return FileResponse(file_path, media_type="application/octet-stream", filename=filename)
