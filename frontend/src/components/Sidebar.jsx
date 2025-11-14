import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ sessions, onNewChat, onSessionClick }) {
  const navigate = useNavigate();

  const handleNewChat = async () => {
    const sessionId = await onNewChat();
    if (sessionId) {
      navigate(`/chat/${sessionId}`);
      onSessionClick();
    }
  };

  const handleSessionClick = (sessionId) => {
    navigate(`/chat/${sessionId}`);
    onSessionClick();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Chat Sessions</h2>
      </div>
      <button className="new-chat-button" onClick={handleNewChat}>
        + New Chat
      </button>
      <div className="sessions-list">
        {sessions.length === 0 ? (
          <div className="no-sessions">No chat sessions yet</div>
        ) : (
          sessions.map(session => (
            <div
              key={session.id}
              className="session-item"
              onClick={() => handleSessionClick(session.id)}
            >
              <div className="session-title">{session.title}</div>
              <div className="session-date">
                {new Date(session.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

export default Sidebar;

