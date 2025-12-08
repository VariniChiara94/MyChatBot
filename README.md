# MYChatBot

## Description
In this repository, you will find the code for MYChatBot both frontend and backend.
The backend is built using FastAPI (Python), while the frontend is developed with React (TypeScript).

## Technologies Used
- Python
- TypeScript
- React

## Usage
The application is just a mock so it is possible to interact with it just with 2 question:
1. "la capitale dell'italia è roma?"
2. "l'italia ha vinto più coppe del mondo di calcio?"
3. In the other case it will respond with "I don't know".

You can run this application using one of the following methods:

### Docker-compose
You can use Docker-compose to run both the frontend and backend services together. Make sure you have Docker and Docker-compose installed on your machine.
Run the following command in the root directory of the project:

```sh
docker compose up --build
```

### Single Docker services
You can also run the frontend and backend services separately using Docker. Navigate to the respective directories (`chatbot-fe` for frontend and `chatbot-be` for backend) and use the following commands:
For the backend:
```sh
cd chatbot-be
docker build -t chatbot-be .
docker run -p 8090:8090 --env ENV=local --env DATA_FOLDER=/app/data chatbot-be
```
For the frontend:
```sh
cd chatbot-fe
docker build -t chatbot-fe .
docker run -p 5173:80 --env chatbot-fe
```

### Local Development
To run locally the services follow the README inside each folder:
- [chatbot-be](./chatbot-be/README.md)
- [chatbot-fe](./chatbot-fe/README.md)


## Improvements

### User Management
- user login and authentication handling: retrieve and check JWT tokens (both fe and be), refresh tokens, send token to backend etc.
- user signup handling
- show user info on the frontend
- add Logout functionality

### Frontend
- delete a single chat
- change chat title
- save/download chat 
- add spinning loader when waiting for response
- add documents download feature from a message
- improve the input box UX/UI
- fix the responsiveness of the app on smaller screens
- add better error handling and display error messages to users 

### Backend
- implement other APIs for chat management (delete chat, update chat title, save/download chat etc.)
- use real LLM like OpenAI, langchain etc. instead of mock model
- use the multilingual feature of the AI model
- use a storage service (i.e. S3) instead of in-memory storage for chats and messages
- integrate JWT validation for user authentication
- use Celery to handle long-running tasks asynchronously
- implement rate limiting to prevent abuse
- integrate Log-tracing for better monitoring and debugging

