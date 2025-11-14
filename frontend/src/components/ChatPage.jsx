import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ChatInput from './ChatInput';
import TableResponse from './TableResponse';
import './ChatPage.css';

const API_BASE_URL = 'https://chat-appilication.onrender.com/api';

function ChatPage({ onSessionsUpdate }) {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (sessionId && sessionId !== 'new') {
      loadMessages();
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/messages`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Failed to load messages');
        setMessages([]);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (content) => {
    if (!content.trim() || sending) return;

    setSending(true);
    const tempId = `temp-${Date.now()}`;
    
    try {
      // Add user message optimistically
      const userMessage = {
        id: tempId,
        role: 'user',
        content: content.trim(),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, userMessage]);

      // Send to backend
      const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (response.ok) {
        const assistantMessage = await response.json();
        // Reload all messages to get the correct user message ID from backend
        await loadMessages();
        onSessionsUpdate();
      } else {
        // Remove optimistic message on error
        setMessages(prev => prev.filter(msg => msg.id !== tempId));
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
      alert('Error sending message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <div className="chat-page loading">Loading messages...</div>;
  }

  return (
    <div className="chat-page">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <h2>Start a new conversation</h2>
            <p>Type a message below to begin chatting.</p>
          </div>
        ) : (
          messages.map(message => (
            <div key={message.id} className={`message ${message.role}`}>
              <div className="message-content">
                <div className="message-text">{message.content}</div>
                {message.structuredData && message.structuredData.type === 'table' && (
                  <TableResponse data={message.structuredData.data} />
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSendMessage} disabled={sending} />
    </div>
  );
}

export default ChatPage;

