# Chat App Project

A complete chat application with a React frontend and Node.js/Express backend. This is a mock implementation that simulates a ChatGPT-like interface using static in-memory data.

## Project Structure

```
chat-app-project/
├── backend/          # Node.js/Express mock API server
│   ├── server.js     # Express server with API endpoints
│   ├── mockData.js   # Static in-memory data
│   └── package.json  # Backend dependencies
└── frontend/         # React frontend application
    ├── src/
    │   ├── components/  # React components
    │   ├── App.jsx      # Main app component with routing
    │   └── ...
    └── package.json     # Frontend dependencies
```

## Features

- **Backend (Mock API)**
  - Four REST API endpoints for session and message management
  - In-memory data storage (no database)
  - CORS enabled for frontend communication
  - Mock responses that can include structured data (tables)

- **Frontend (React)**
  - ChatGPT-like interface with sidebar and chat window
  - React Router for navigation
  - Light/dark theme toggle
  - Table rendering for structured responses
  - Responsive design with plain CSS (no Tailwind)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

The backend will run on `https://chat-appilication.onrender.com`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will typically run on `(https://chat-appilication.netlify.app/)` (Vite default port)

## API Endpoints

### GET `/api/sessions`
Returns all chat session IDs with their titles and creation dates.

### POST `/api/sessions`
Creates a new chat session and returns the session object.

### GET `/api/sessions/:sessionId/messages`
Returns all messages for a specific session.

### POST `/api/sessions/:sessionId/messages`
Accepts a user message and returns a mock assistant response. The response may include:
- Plain text content
- Optional structured data (table format)

**Request Body:**
```json
{
  "content": "Your message here"
}
```

**Response:**
```json
{
  "id": "msg-123",
  "role": "assistant",
  "content": "Response text",
  "timestamp": "2024-01-15T10:00:00.000Z",
  "structuredData": {
    "type": "table",
    "data": {
      "headers": ["Column 1", "Column 2"],
      "rows": [["Value 1", "Value 2"]]
    }
  }
}
```

## Usage

1. Start both the backend and frontend servers
2. Open your browser and navigate to the frontend URL (usually `http://localhost:5173`)
3. The app will automatically create a new chat session
4. Use the sidebar to:
   - Click "New Chat" to create a new session
   - Click on any existing session to load it
5. Type messages in the chat input and press Enter to send
6. The backend will return mock responses, which may include tables if your message contains keywords like "table", "comparison", "list", etc.
7. Toggle between light and dark themes using the button in the top-right corner

## Technology Stack

- **Backend:** Node.js, Express, CORS
- **Frontend:** React, React Router, Vite
- **Styling:** Plain CSS (no utility frameworks)

## Notes

- All data is stored in-memory and will be lost when the server restarts
- This is a mock implementation with no real AI or database
- The backend detects keywords in messages to determine if a table response should be included

