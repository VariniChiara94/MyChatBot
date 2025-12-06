import os

import uvicorn
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from chatbot_be.api import core_router, system_router
from chatbot_be.handlers import LoggingErrorMiddleware, validation_exception_handler

app = FastAPI(
    title="chatbot-be",
    description="",
    version="0.0.1",
    terms_of_service="",
    contact={
        "name": "Chiara Varini",
        "email": "varinichiara@gmail.com",
    },
    # openapi_prefix="/chatbot-be" if os.getenv('ENV') != 'local' else None
)


# add exception handlers
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_middleware(LoggingErrorMiddleware)

# include submodules routers
app.include_router(system_router)
app.include_router(core_router)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)
