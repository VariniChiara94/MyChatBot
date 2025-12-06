# Make file for backend-microservice
clean:
	rm -rf .venv

setup:
	@pyenv install 3.12 -s
	@pyenv local 3.12
	@poetry config virtualenvs.in-project true
	@poetry env use 3.12
	@poetry install

test: setup
	@PYTHONPATH=:. poetry run pytest --cov=chatbot_be

build: setup
	@docker build -t chatbot-be:local --file Dockerfile --build-arg ENV=dev .

run: test build
	@docker compose up

run-local: setup
	@ENV="local" DATA_FOLDER=$(shell pwd)/data poetry run uvicorn chatbot_be.main:app --port 8090

run-docker: build
	@docker compose up