from abc import ABC, abstractmethod


class AbstractPipeline(ABC):
    """
    Abstract base class for a pipeline.

    This class defines the common methods for an endpoint.
    """

    @abstractmethod
    async def data_quality(self, data):
        """
        Performs data quality checks on the input data.

        Args:
            data: The input data.

        Returns:
            The cleaned data.
        """
        pass

    @abstractmethod
    async def preprocess_input(self, validated_data):
        """
        Preprocesses the input data for the model.

        Args:
            validated_data: The validated data.

        Returns:
            The preprocessed data.
        """
        pass

    @abstractmethod
    async def get_model_result(self, preprocessed_data):
        """
        Performs model inference on the preprocessed data.

        Args:
            preprocessed_data: The preprocessed data.

        Returns:
            The model prediction.
        """
        pass

    @abstractmethod
    async def prepare_output(self, output_data, req):
        """
        Prepares the output object based on the model prediction.

        Args:
            output_data: The model prediction.

        Returns:
            The output object.
        """
        pass
