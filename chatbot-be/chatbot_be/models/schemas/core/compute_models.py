from typing import Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

from chatbot_be.models.entities.conversations.conversation_entities import Message
from chatbot_be.models.validators.core.compute_validators import ComputeValidators


class ComputeRequest(BaseModel):
    """
    Input model for the compute endpoint.

    Attributes:
        message (Message): The message containing the user question to be processed by the LLM.
        engine (Optional[str]): The engine to be used for computation, defaults to "mocked".
    """

    message: Message
    engine: Optional[str] = Field(default="mocked")

    @model_validator(mode="after")
    def model_validate(cls, value):
        """
        Validates the input data using the ComputeValidators class.

        Returns:
            ComputeRequest: The validated input data.
        """
        return ComputeValidators.validate_request(value)


class ComputeDataResponse(BaseModel):
    """
    Output model for the compute endpoint.

    Attributes:
        message (Message): The processed message returned by the LLM.
    """

    message: Message
    
    @model_validator(mode="after")
    def model_validate(cls, value):
        """
        Validates the output data using the ComputeValidators class.

        Returns:
            ComputeDataResponse: The validated output data.
        """
        return ComputeValidators.validate_response(value)
    

class ComputeParams(BaseModel):
    """
    Input Params model for the compute endpoint.

    Attributes:
        model_config (ConfigDict): Configuration for extra fields handling.
    """

    # add here optional or mandatory parameters
    # e.g:
    # param1: Optional[str] = None
    # param2: dict
    # param3: str =Field("value_param3")

    model_config = ConfigDict(extra='forbid')

    @model_validator(mode="after")
    def model_validate(cls, value):
        """
        Validates the parameters using the ComputeValidators class.

        Returns:
            ComputeParams: The validated parameters.
        """
        return ComputeValidators.validate_params(value)