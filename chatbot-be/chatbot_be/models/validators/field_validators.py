from chatbot_be.utils.status_code import (
    MAX_STATUS_CODE,
    MIN_STATUS_CODE,
)

def app_status_code_is_valid(value: int) -> int:
    if MIN_STATUS_CODE <= value <= MAX_STATUS_CODE:
        return value
    raise ValueError(f"Invalid Internal Status Code status code: {value}")