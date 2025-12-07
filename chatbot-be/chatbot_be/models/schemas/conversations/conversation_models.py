from pydantic import BaseModel, model_validator

from chatbot_be.models.entities.conversations.conversation_entities import Conversation
from chatbot_be.models.validators.core.compute_validators import ComputeValidators


class GetConversationResponse(BaseModel):
    """
    Output model for the get conversation endpoint.

    Attributes:
        user_conversations (list[Conversation]): The list of conversations.
    """

    user_conversations: list[Conversation]

    @model_validator(mode="after")
    def model_validate(cls, value):
        """
        Validates the output data using the ComputeValidators class.

        Returns:
            GetConversationResponse: The validated output data.
        """
        return ComputeValidators.validate_response(value)
