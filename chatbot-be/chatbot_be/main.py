import os

import uvicorn
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.middleware.cors import CORSMiddleware

from chatbot_be.api import core_router, system_router
from chatbot_be.api.v1.conversations import conversations_router
from chatbot_be.api.v1.data import data_router
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# add exception handlers
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_middleware(LoggingErrorMiddleware)

# include submodules routers
app.include_router(system_router)
app.include_router(core_router)
app.include_router(conversations_router)
app.include_router(data_router)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)
