import threading
from functools import lru_cache

from chatbot_be.config import get_settings
from chatbot_be.middleware.pipeline.abstract_pipeline import AbstractPipeline
from chatbot_be.models.entities.conversations.conversation_entities import Message
from chatbot_be.models.schemas.core.compute_models import ComputeRequest

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

    async def prepare_output(self, output_data, req: ComputeRequest):
        """
        Prepares the output object based on the model prediction.

        Args:
            output_data: The model prediction.
            req: The request object.

        Returns:
            The output object.
        """

        res_mes: Message = Message(id="mocked_resp_3", text="Scusa non ho capito la domanda", date="2025-12-07T21:47:00Z", owner="bot")

        match req.message.text.strip().lower():
            case "la capitale dell'italia è roma?":
                res_mes =  Message(id="mocked_resp_1", text="Sì esatto, di seguito le referenze", date="2025-12-07T21:30:00Z", owner="bot", references=["https://it.wikipedia.org/wiki/Roma"])
            case "l'italia ha vinto più coppe del mondo di calcio?":
                res_mes = Message(id="mocked_resp_2", text="No, il paese con più coppe di calcio è il brasile", date="2025-12-07T21:35:00Z", owner="bot", references=["https://juventusnews.eu/albo-doro-modiali/", "https://it.wikipedia.org/wiki/Campionato_mondiale_di_calcio", "https://www.fifa.com/fifa-world-cup/"])

        res = {
                "message": {
                    "id": res_mes.id,
                    "text": res_mes.text,
                    "date": res_mes.date,
                    "owner": res_mes.owner,
                    "references": res_mes.references,
                }
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
