from pydantic import BaseModel, ValidationError
from chatbot_be.models.validators.abstract_validator import BaseValidator


class SetValidators(BaseValidator):
    """
    Concrete implementation of Set validators.

    This class provides specific implementations for the abstract methods defined in `BaseValidator`.
    """

    @staticmethod
    def validate_request(request: BaseModel) -> BaseModel:
        """
        Validates the input request data for the Set endpoint.

        Args:
            request (BaseModel): The input request data object.

        Returns:
            BaseModel: The validated request data object.

        Raises:
            ValidationError: If the input request data is invalid.
        """
        # Perform validation checks on the input data
        # ...

        return request

    @staticmethod
    def validate_params(params: BaseModel) -> BaseModel:
        """
        Validates the input parameters for the Set endpoint.

        Args:
            params (BaseModel): The input parameters data object.

        Returns:
            BaseModel: The validated parameters data object.

        Raises:
            ValidationError: If the input parameters data is invalid.
        """
        # Perform validation checks on the input params data
        # ...

        return params

    @staticmethod
    def validate_response(response: BaseModel) -> BaseModel:
        """
        Validates the response data for the Set endpoint.

        Args:
            response (BaseModel): The response data object.

        Returns:
            BaseModel: The validated response data object.

        Raises:
            ValidationError: If the response data is invalid.
        """
        # Perform validation checks on the input data
        # ...

        return response
