import threading
from functools import lru_cache

from chatbot_be.config import get_settings
from chatbot_be.middleware.pipeline.abstract_pipeline import AbstractPipeline

_instance = None
_lock = threading.Lock()


class CorePipeline(AbstractPipeline):
    """
    Concrete implementation of pipeline.

    This class provides specific implementations for the abstract methods defined in `AbstractPipeline`.
    """

    def __init__(self):
        super().__init__()
        self.settings = get_settings()

    async def data_quality(self, data):
        """
        Performs data quality checks on the input data.

        Args:
            data: The input data.

        Returns:
            The cleaned data.
        """

        def clean(data):
            return data

        """Process the request."""

        data_cleaned = clean(data)
        return data_cleaned

    async def preprocess_input(self, validated_data):
        """
        Preprocesses the input data for the model.

        Args:
            validated_data: The validated data.

        Returns:
            The preprocessed data.
        """
        preprocessed_data = validated_data
        return preprocessed_data

    async def get_model_result(self, preprocessed_data):
        """
        Performs model inference on the preprocessed data.

        Args:
            preprocessed_data: The preprocessed data.

        Returns:
            The model prediction.
        """
        out = preprocessed_data
        return out

    async def prepare_output(self, output_data, req):
        """
        Prepares the output object based on the model prediction.

        Args:
            output_data: The model prediction.

        Returns:
            The output object.
        """
        res = {
            "data1": output_data["data1"],
            "data2": output_data["data2"],
        }
        return res


@lru_cache(maxsize=1)
def get_core_pipeline():
    """
    Load core pipeline.

    :return: CorePipeline object.
    """
    global _instance
    if _instance is None:
        with _lock:
            if _instance is None:
                _instance = CorePipeline()
    return _instance
