from abc import ABC, abstractmethod


class BaseValidator(ABC):
    """
    Abstract base class for validators.

    This class defines the common methods that all validators must implement.
    """

    @abstractmethod
    def validate_request(self):
        """
        Validates the input data for the endpoint.

        Returns:
            The validated input data.
        """
        pass

    @abstractmethod
    def validate_params(self):
        """
        Validates the input params data for the endpoint.

        Returns:
            The validated input params data.
        """
        pass

    @abstractmethod
    def validate_response(self):
        """
        Validates the input data for the endpoint.

        Returns:
            The validated input data.
        """
        pass
