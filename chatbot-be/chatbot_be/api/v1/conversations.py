from datetime import datetime

from fastapi import APIRouter

from chatbot_be.models.commons import AppResponse
from chatbot_be.models.entities.conversations.conversation_entities import Message, Conversation, FileMetadata
from chatbot_be.models.schemas.conversations.conversation_models import GetConversationResponse
from chatbot_be.models.schemas.core.get_models import GetDataResponse
from chatbot_be.utils import status_code

conversations_router = APIRouter(
    prefix="/api/v1/conversations",
    tags=["conversations"],
)


@conversations_router.get("/get/{user_id}")
async def get_all_user_conversations(
        user_id: str
) -> AppResponse[GetConversationResponse]:
    """
    Handles the GET request to retrieve data.

    Path Args:
        user_id (str): The ID of the user whose conversations are to be retrieved.

    Returns:
        AppResponse[GetDataResponse]: A response object containing the retrieved data.
    """

    # Simulate data retrieval logic

    mocked_mess = [
        Message(
            id="1",
            text="E' vero che Rimini è una città di mare?",
            date=datetime.strptime("2025-12-07 19:30:00", "%Y-%m-%d %H:%M:%S"),
            owner="user",
            files=None,
            references=None
        ),
        Message(
            id="2",
            text="Sì è vero che Rimini è una città di mare, come si può verificare dalle risorse riportate di seguito.",
            date=datetime.strptime("2025-12-07 19:33:00", "%Y-%m-%d %H:%M:%S"),
            owner="bot",
            files=None,
            references=["https://it.wikipedia.org/wiki/Rimini", "https://www.visitrimini.com/"]
        ),
        Message(
            id="3",
            text="Nella foto allegata è rappresentata la riviera Romagnola?",
            date=datetime.strptime("2025-12-07 19:43:00", "%Y-%m-%d %H:%M:%S"),
            owner="user",
            files=[FileMetadata(name="panoramica-spiaggia3.jpg", size=204800, content_type="image/jpeg")],
            references=None
        ),
        Message(
            id="4",
            text="Sì confermo, nella foto è rappresentata la riviera Romagnola con le sue spiagge e il mare Adriatico.",
            date=datetime.strptime("2025-12-07 19:59:00", "%Y-%m-%d %H:%M:%S"),
            owner="user",
            files=None,
            references=None
        )
    ]

    mocked_conv = [
        Conversation(
            id="conv1",
            title="Conversazione su Rimini",
            createAt=datetime.strptime("2025-12-07 19:30:00", "%Y-%m-%d %H:%M:%S"),
            messages=mocked_mess
        )
    ]
    response = GetConversationResponse(user_conversations=mocked_conv)
    return AppResponse(data=response,
                       details="Endpoint /api/v1/core/get endend successfully",
                       app_status_code=status_code.APP_200_OK)
