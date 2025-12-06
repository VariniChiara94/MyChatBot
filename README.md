# MYChatBot

## Description
In this repository, you will find the code for MYChatBot both frontend and backend.
The backend is built using FastAPI (Python), while the frontend is developed with React (TypeScript).

## Technologies Used
- Python
- TypeScript
- React

## Testing Instructions
To test the application, follow these steps:
...


## Possible Improvements

### User Management
- user login and authentication handling: check JWT tokens, refresh tokens, send token to backend etc.
- user signup handling
- Show user info on the frontend
- add Logout functionality

### Chat Features
- delete single chat
- change chat title
- save/download chat 
- add spinning loader when waiting for response

### Backend
- use real LLM like OpenAI, langchain etc. instead of mock model
- use a DB instead of in-memory storage for chats and messages
- integrate JWT validation for user authentication
- use Celery to handle long-running tasks asynchronously
- implement rate limiting to prevent abuse
- integrate Log-tracing for better monitoring and debugging

