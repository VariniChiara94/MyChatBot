from typing import Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator
from chatbot_be.models.validators.core.get_validators import GetValidators


class GetDataResponse(BaseModel):
    """
    Output model for the endpoint.

    Attributes:
        data1 (str): The primary data field.
        data2 (Optional[str]): An optional secondary data field.
    """

    data1: str
    data2: Optional[str] = Field(default=None)
    
    @model_validator(mode="after")
    def model_validate(cls, value):
        """
        Validates the output data using the GetValidators class.

        Args:
            value: The data to validate.

        Returns:
            The validated data.
        """
        return GetValidators.validate_response(value)
    

class GetParams(BaseModel):
    """
    Input Params model for the endpoint.

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
        Validates the input parameters using the GetValidators class.

        Args:
            value: The parameters to validate.

        Returns:
            The validated parameters.
        """
        return GetValidators.validate_params(value)