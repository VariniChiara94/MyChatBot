from typing import Generic, TypeVar

from pydantic import BaseModel, field_validator
from chatbot_be.models.validators.field_validators import (
    app_status_code_is_valid
)
# Definiamo un TypeVar per rendere il modello generico
T = TypeVar("T")


class BaseResponse(BaseModel):
    """
    A generic response model for APIs.

    Attributes:
        details (str): Additional details or metadata about the response.
        status_code (int): The HTTP status code associated with the response.
    """
    details: str
    app_status_code: int

    _validate_status_code = field_validator("app_status_code")(app_status_code_is_valid)
# Modello generico che può essere esteso
class AppResponse(BaseResponse, Generic[T]):
    """
    A generic response model for APIs.

    Attributes:
        data (T): The main data payload of the response, which can be of any type.
        details (str): Additional details or metadata about the response.
        status_code (int): The HTTP status code associated with the response.
    """
    data: T


class ErrorResponse(BaseResponse):
    """
    A generic response model for APIs.

    Attributes:
        details (str): Additional details or metadata about the response.
        status_code (int): The HTTP status code associated with the response.
    """

