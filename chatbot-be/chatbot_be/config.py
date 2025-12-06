import os
import threading
from functools import lru_cache

try:
    import tomllib
except ModuleNotFoundError:
    import tomli as tomllib
from pydantic import Field
from pydantic_settings import BaseSettings

_instance = None
_lock = threading.Lock()


def get_configs_toml():
    common_config_path = os.path.join(
        os.getenv("DATA_FOLDER"),
        "configs",
        "config.common.toml"
    )
    env_config_path = os.path.join(
        os.getenv("DATA_FOLDER"),
        "configs",
        f"config.{os.getenv('ENV')}.toml"
    )

    with open(common_config_path, "rb") as common_file:
        common_config = tomllib.load(common_file)

    with open(env_config_path, "rb") as env_file:
        env_config = tomllib.load(env_file)

    # Merge common and environment-specific configurations
    config = {**common_config, **env_config}
    return config


class Settings(BaseSettings):
    """ chatbot-be Settings Class """

    env: str = Field(..., env="ENV")
    data_folder: str = Field(..., env="DATA_FOLDER")
    configs: dict = Field(default_factory=get_configs_toml)


# app settings
@lru_cache(maxsize=1)
def get_settings():
    """
    Load chatbot-be service configs.

    :return: Settings object with config inside.
    """
    global _instance
    if _instance is None:
        with _lock:
            if _instance is None:
                _instance = Settings()
    return _instance
