// Static mock data for the chat application
let sessions = [
  {
    id: 'session-1',
    createdAt: new Date('2024-01-15T10:00:00').toISOString(),
    title: 'Introduction to React'
  },
  {
    id: 'session-2',
    createdAt: new Date('2024-01-16T14:30:00').toISOString(),
    title: 'JavaScript Arrays'
  },
  {
    id: 'session-3',
    createdAt: new Date('2024-01-17T09:15:00').toISOString(),
    title: 'CSS Grid Layout'
  }
];

let conversations = {
  'session-1': [
    {
      id: 'msg-1',
      role: 'user',
      content: 'What is React?',
      timestamp: new Date('2024-01-15T10:00:00').toISOString()
    },
    {
      id: 'msg-2',
      role: 'assistant',
      content: 'React is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and allows developers to create reusable UI components.',
      timestamp: new Date('2024-01-15T10:00:15').toISOString()
    },
    {
      id: 'msg-3',
      role: 'user',
      content: 'Can you show me a comparison of React vs Vue?',
      timestamp: new Date('2024-01-15T10:01:00').toISOString()
    },
    {
      id: 'msg-4',
      role: 'assistant',
      content: 'Here\'s a comparison of React and Vue:',
      timestamp: new Date('2024-01-15T10:01:15').toISOString(),
      structuredData: {
        type: 'table',
        data: {
          headers: ['Feature', 'React', 'Vue'],
          rows: [
            ['Learning Curve', 'Moderate', 'Easy'],
            ['Template Syntax', 'JSX', 'HTML-like'],
            ['State Management', 'Redux/MobX', 'Vuex/Pinia'],
            ['Bundle Size', 'Larger', 'Smaller'],
            ['Community', 'Very Large', 'Large']
          ]
        }
      }
    }
  ],
  'session-2': [
    {
      id: 'msg-5',
      role: 'user',
      content: 'How do I filter an array in JavaScript?',
      timestamp: new Date('2024-01-16T14:30:00').toISOString()
    },
    {
      id: 'msg-6',
      role: 'assistant',
      content: 'You can use the `filter()` method to filter arrays in JavaScript. Here\'s an example:\n\n```javascript\nconst numbers = [1, 2, 3, 4, 5];\nconst evens = numbers.filter(n => n % 2 === 0);\n// Result: [2, 4]\n```',
      timestamp: new Date('2024-01-16T14:30:20').toISOString()
    },
    {
      id: 'msg-7',
      role: 'user',
      content: 'Show me array methods comparison',
      timestamp: new Date('2024-01-16T14:31:00').toISOString()
    },
    {
      id: 'msg-8',
      role: 'assistant',
      content: 'Here are common JavaScript array methods:',
      timestamp: new Date('2024-01-16T14:31:15').toISOString(),
      structuredData: {
        type: 'table',
        data: {
          headers: ['Method', 'Returns', 'Mutates Array'],
          rows: [
            ['map()', 'New array', 'No'],
            ['filter()', 'New array', 'No'],
            ['forEach()', 'undefined', 'No'],
            ['push()', 'New length', 'Yes'],
            ['pop()', 'Removed element', 'Yes'],
            ['slice()', 'New array', 'No'],
            ['splice()', 'Array of removed', 'Yes']
          ]
        }
      }
    }
  ],
  'session-3': [
    {
      id: 'msg-9',
      role: 'user',
      content: 'How do I create a grid layout in CSS?',
      timestamp: new Date('2024-01-17T09:15:00').toISOString()
    },
    {
      id: 'msg-10',
      role: 'assistant',
      content: 'CSS Grid is a powerful layout system. You can create a grid by setting `display: grid` on a container and defining columns and rows using `grid-template-columns` and `grid-template-rows`.',
      timestamp: new Date('2024-01-17T09:15:20').toISOString()
    }
  ]
};

// Counter for generating new session IDs
let sessionCounter = 4;
let messageCounter = 11;

// Export data objects (they can be mutated since they're passed by reference)
module.exports = {
  getSessions: () => sessions,
  getConversations: () => conversations,
  getSessionCounter: () => sessionCounter,
  getMessageCounter: () => messageCounter,
  setSessionCounter: (val) => { sessionCounter = val; },
  setMessageCounter: (val) => { messageCounter = val; },
  addSession: (session) => { sessions.unshift(session); },
  addMessage: (sessionId, message) => {
    if (!conversations[sessionId]) {
      conversations[sessionId] = [];
    }
    conversations[sessionId].push(message);
  },
  updateSessionTitle: (sessionId, title) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      session.title = title;
    }
  }
};

