from typing import Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator
from chatbot_be.models.validators.core.set_validators import SetValidators


class SetRequest(BaseModel):
    """
    Input model for the Set endpoint.

    Attributes:
        data1 (str): The primary input data.
        data2 (Optional[str]): The secondary input data, optional.
    """

    data1: str
    data2: Optional[str] = Field(default=None)

    @model_validator(mode="after")
    def model_validate(cls, value):
        """
        Validates the input data using the SetValidators class.

        Returns:
            SetRequest: The validated input data.
        """
        return SetValidators.validate_request(value)


class SetDataResponse(BaseModel):
    """
    Output model for the Set endpoint.

    Attributes:
        data1 (str): The primary output data.
        data2 (Optional[str]): The secondary output data, optional.
    """

    data1: str
    data2: Optional[str] = Field(default=None)
    
    @model_validator(mode="after")
    def model_validate(cls, value):
        """
        Validates the output data using the SetValidators class.

        Returns:
            SetDataResponse: The validated output data.
        """
        return SetValidators.validate_response(value)
    

class SetParams(BaseModel):
    """
    Input Params model for the Set endpoint.

    Attributes:
        model_config (ConfigDict): Configuration to forbid extra fields.
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
        Validates the input parameters using the SetValidators class.

        Returns:
            SetParams: The validated input parameters.
        """
        return SetValidators.validate_params(value)