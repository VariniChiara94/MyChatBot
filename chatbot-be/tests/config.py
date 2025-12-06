import os
from typing import Tuple

from pydantic_settings import BaseSettings

ENV = "test"
DATA_FOLDER = "data"


class TestSettings(BaseSettings):
    """Test Settings Class"""

    __test__ = False

    env: str
    data_folder: str
    configs: dict
