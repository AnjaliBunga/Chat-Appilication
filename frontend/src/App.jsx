import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatPage from './components/ChatPage';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    // Update theme attribute when theme changes
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleNewSession = async () => {
    try {
      const response = await fetch('https://chat-appilication.onrender.com/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newSession = await response.json();
      setSessions(prev => [newSession, ...prev]);
      return newSession.id;
    } catch (error) {
      console.error('Error creating new session:', error);
      return null;
    }
  };

  const loadSessions = async () => {
    try {
      const response = await fetch('https://chat-appilication.onrender.com/api/sessions');
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  return (
    <Router>
      <div className="app">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <Sidebar 
          sessions={sessions} 
          onNewChat={handleNewSession}
          onSessionClick={loadSessions}
        />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={<NewChatRedirect onNewSession={handleNewSession} />} 
            />
            <Route 
              path="/chat/:sessionId" 
              element={
                <ChatPage 
                  onSessionsUpdate={loadSessions}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function NewChatRedirect({ onNewSession }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    const createAndRedirect = async () => {
      const sessionId = await onNewSession();
      if (sessionId) {
        navigate(`/chat/${sessionId}`, { replace: true });
      }
    };
    createAndRedirect();
  }, [onNewSession, navigate]);

  return <div className="loading">Creating new chat...</div>;
}

export default App;
