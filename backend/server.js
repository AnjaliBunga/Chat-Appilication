const express = require('express');
const cors = require('cors');
const mockData = require('./mockData');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint 1: Get all session IDs
app.get('/api/sessions', (req, res) => {
  const sessions = mockData.getSessions();
  res.json(sessions.map(session => ({
    id: session.id,
    title: session.title,
    createdAt: session.createdAt
  })));
});

// Endpoint 2: Create a new session
app.post('/api/sessions', (req, res) => {
  const sessionCounter = mockData.getSessionCounter();
  const newSessionId = `session-${sessionCounter}`;
  const newSession = {
    id: newSessionId,
    createdAt: new Date().toISOString(),
    title: 'New Chat'
  };
  
  // Add to sessions array
  mockData.addSession(newSession);
  
  // Initialize empty conversation
  const conversations = mockData.getConversations();
  conversations[newSessionId] = [];
  
  // Increment counter
  mockData.setSessionCounter(sessionCounter + 1);
  
  res.json(newSession);
});

// Endpoint 3: Get conversation history for a specific session
app.get('/api/sessions/:sessionId/messages', (req, res) => {
  const conversations = mockData.getConversations();
  const { sessionId } = req.params;
  
  if (!conversations[sessionId]) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  res.json(conversations[sessionId]);
});

// Endpoint 4: Send a message and get a mock response
app.post('/api/sessions/:sessionId/messages', (req, res) => {
  const conversations = mockData.getConversations();
  const { sessionId } = req.params;
  const { content } = req.body;
  
  if (!conversations[sessionId]) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Message content is required' });
  }
  
  // Get current message counter
  let messageCounter = mockData.getMessageCounter();
  
  // Check if this is the first user message (to set session title)
  const existingMessages = conversations[sessionId] || [];
  const isFirstUserMessage = existingMessages.length === 0 || 
    !existingMessages.some(msg => msg.role === 'user');
  
  // Create user message
  const userMessage = {
    id: `msg-${messageCounter++}`,
    role: 'user',
    content: content.trim(),
    timestamp: new Date().toISOString()
  };
  
  // Add user message to conversation
  mockData.addMessage(sessionId, userMessage);
  
  // If this is the first user message, update the session title
  if (isFirstUserMessage) {
    // Use first 50 characters of the message as title, or full message if shorter
    const title = content.trim().length > 50 
      ? content.trim().substring(0, 50) + '...'
      : content.trim();
    mockData.updateSessionTitle(sessionId, title);
  }
  
  // Generate mock response
  const mockResponses = [
    {
      content: 'That\'s an interesting question! Let me help you with that.',
      hasTable: false
    },
    {
      content: 'I understand what you\'re asking. Here\'s some information that might help:',
      hasTable: false
    },
    {
      content: 'Great question! Here\'s a comparison table:',
      hasTable: true,
      tableData: {
        headers: ['Option A', 'Option B', 'Option C'],
        rows: [
          ['Feature 1', 'Value 1', 'Value 2'],
          ['Feature 2', 'Value 3', 'Value 4'],
          ['Feature 3', 'Value 5', 'Value 6']
        ]
      }
    },
    {
      content: 'Here\'s a detailed breakdown:',
      hasTable: true,
      tableData: {
        headers: ['Category', 'Details', 'Notes'],
        rows: [
          ['Item 1', 'Description 1', 'Note 1'],
          ['Item 2', 'Description 2', 'Note 2'],
          ['Item 3', 'Description 3', 'Note 3']
        ]
      }
    }
  ];
  
  // Check if user message contains keywords that suggest they want a table
  const lowerContent = content.toLowerCase();
  const wantsTable = lowerContent.includes('table') || 
                     lowerContent.includes('comparison') || 
                     lowerContent.includes('compare') ||
                     lowerContent.includes('list') ||
                     lowerContent.includes('show me');
  
  const responseTemplate = wantsTable 
    ? mockResponses.find(r => r.hasTable) || mockResponses[2]
    : mockResponses[Math.floor(Math.random() * 2)];
  
  // Create assistant message
  const assistantMessage = {
    id: `msg-${messageCounter++}`,
    role: 'assistant',
    content: responseTemplate.content,
    timestamp: new Date().toISOString()
  };
  
  // Add structured data if response includes a table
  if (responseTemplate.hasTable && responseTemplate.tableData) {
    assistantMessage.structuredData = {
      type: 'table',
      data: responseTemplate.tableData
    };
  }
  
  // Add assistant message to conversation
  mockData.addMessage(sessionId, assistantMessage);
  
  // Update message counter
  mockData.setMessageCounter(messageCounter);
  
  // Return the assistant message
  res.json(assistantMessage);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});

