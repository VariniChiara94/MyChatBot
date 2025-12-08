# chatbot-fe

Frontend React application for the Chatbot project.

## Features

- Modern UI built with React and Material-UI
- Chat interface with file upload support
- Integration with AI backend API

## Prerequisites

- Node.js (v18 or higher recommended)
- npm

## Getting Started

### Install dependencies and run

```sh
npm install
npm run dev
```

### Run with Docker

```sh
docker build -t chatbot-frontend .
docker run -p 5173:80 chatbot-frontend
```