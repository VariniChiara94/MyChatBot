FROM python:3.12-slim

LABEL mantainer="varinichiara@gmail.com"
LABEL description=""

ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    # Poetry's configuration:
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_CACHE_DIR='/var/cache/pypoetry' \
    POETRY_HOME='/usr/local'

WORKDIR /app

ENV HOME /root

COPY chatbot_be chatbot_be
COPY data data
COPY README.md README.md

RUN apt-get update && apt-get install -y curl && \
    python3.12 -m pip install --upgrade pip setuptools wheel
# System deps:
RUN curl -sSL https://install.python-poetry.org | python3 -

# requiremenets
COPY poetry.lock poetry.lock
COPY pyproject.toml pyproject.toml

RUN poetry install --no-interaction --no-ansi --without dev
RUN pip install python-multipart

COPY entrypoint.sh entrypoint.sh
RUN ["chmod", "+x", "./entrypoint.sh"]

ENTRYPOINT ["./entrypoint.sh"]

