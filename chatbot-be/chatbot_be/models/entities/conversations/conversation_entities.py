import datetime
from typing import Optional

from fastapi import File
from pydantic import BaseModel, model_validator, Field

from chatbot_be.models.validators.core.compute_validators import ComputeValidators

class FileMetadata(BaseModel):
    """
    File metadata model.

    Attributes:
        filename (str): The name of the file.
        url (str): The URL of the file.
        size (int): The size of the file in bytes.
        mime_type (str): The MIME type of the file.
    """

    name: str
    size: int
    content_type: str


class Message(BaseModel):
    """
    Message model.

    Attributes:
        id (str): The message ID.
        text (str): The message text.
        date (datetime.datetime): The message date.
        owner (str): The message owner.
        files (Optional[list[File]]): The message files, optional.
        references (Optional[list[str]]): The message references, optional.
    """

    id: str
    text: str
    date: datetime.datetime
    owner: str
    files: Optional[list[FileMetadata]] = Field(default=None)
    references: Optional[list[str]] = Field(default=None)

    @model_validator(mode="after")
    def model_validate(cls, value):
        """
        Validates the input data using the ComputeValidators class.

        Returns:
            ComputeRequest: The validated input data.
        """
        return ComputeValidators.validate_request(value)


class Conversation(BaseModel):
    """
    Conversation model.

    Attributes:
       id (str): The conversation ID.
       title (str): The conversation title.
       createAt (datetime.datetime): The conversation creation date.
       messages (Optional[list[Message]]): The conversation messages, optional.
    """

    id: str
    title: str
    createAt: datetime.datetime
    messages: Optional[list[Message]] = Field(default=None)

    @model_validator(mode="after")
    def model_validate(cls, value):
        """
        Validates the input data using the ComputeValidators class.

        Returns:
            ComputeRequest: The validated input data.
        """
        return ComputeValidators.validate_request(value)