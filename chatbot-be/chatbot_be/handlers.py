import time
import traceback

from fastapi import Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from loguru import logger
from starlette.middleware.base import BaseHTTPMiddleware

from chatbot_be.models.commons import ErrorResponse


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.error(repr(exc))
    logger.error(traceback.format_exc())
    error_details = f"content: {exc.errors()}, body: {exc.body}"
    response = ErrorResponse(
        app_status_code=status.HTTP_400_BAD_REQUEST,
        details=error_details,
    )
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content=jsonable_encoder(response),
    )


class LoggingErrorMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            logger.info(f"Start {request.url} endpoint ")
            start = time.time()
            response = await call_next(request)
            execution_time = time.time() - start
            logger.info(
                f"End {request.url} endpoint - execution time: {execution_time}"
            )
            return response
        except Exception as e :
            logger.error(repr(e))
            logger.error(traceback.format_exc())
            details = "An internal error occurs"
            response = ErrorResponse(
                details=details,
                app_status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            return JSONResponse(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                content=jsonable_encoder(response),
            )