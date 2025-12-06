#!/bin/bash

gunicorn \
    -w ${WORKER_NUM:-1} \
    --threads 8 \
    --timeout 0 \
    -k uvicorn.workers.UvicornWorker chatbot_be.main:app \
    --bind :${PORT:-8090}