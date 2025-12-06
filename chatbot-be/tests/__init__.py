from unittest.mock import Mock, patch

import pytest

from tests.config import (
    DATA_FOLDER,
    ENV,
    TestSettings,
)


#
# Config Override Methods
#
def get_settings_override():
    """
    Overrideconfigs for test purposes.

    :return: overridden Settings object.
    """
    return TestSettings(
        env=ENV,
        data_folder=DATA_FOLDER,
        configs={"env": "test", "app_name": "test-chatbot-be"},
    )
