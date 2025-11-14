# Quick Start Guide

## Running the Application

### Step 1: Start the Backend

Open a terminal and run:

```bash
cd backend
npm install
node server.js
```

You should see: `Mock API server running on http://localhost:5000`

### Step 2: Start the Frontend

Open a **new** terminal and run:

```bash
cd frontend
npm install
npm run dev
```

You should see the Vite dev server URL (typically `http://localhost:5173`)

### Step 3: Open in Browser

Navigate to the frontend URL shown in the terminal (usually `http://localhost:5173`)

## Testing the Application

1. **Create a New Chat**: Click the "+ New Chat" button in the sidebar
2. **Send a Message**: Type a message and press Enter
3. **Request a Table**: Try messages like:
   - "Show me a comparison table"
   - "Create a list of features"
   - "Compare options A and B"
4. **Switch Sessions**: Click on any session in the sidebar to load it
5. **Toggle Theme**: Click the moon/sun icon in the top-right corner

## Troubleshooting

- **Backend not responding**: Make sure the backend is running on port 5000
- **CORS errors**: Ensure the backend server is running and CORS is enabled
- **Frontend can't connect**: Check that `http://localhost:5000` is accessible
- **Port already in use**: Change the PORT in `backend/server.js` if needed

