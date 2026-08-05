import { useEffect, useRef } from 'react';

function MessageList({ messages, currentUsername }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="message-list">
        <div className="message-list-empty">
          <div className="empty-icon">💬</div>
          <span className="empty-text">No messages yet — say hello!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((msg, i) => {
        const isSystem = msg.isSystem || msg.username === 'System';
        const isOwn = !isSystem && msg.username === currentUsername;
        const type = isSystem ? 'system' : isOwn ? 'own' : 'other';

        return (
          <div key={i} className={`message-wrapper ${type}`}>
            {!isSystem && (
              <span className="message-sender">
                {isOwn ? 'You' : msg.username}
              </span>
            )}
            <div className="message-bubble">{msg.message}</div>
            {!isSystem && (
              <span className="message-timestamp">{msg.time}</span>
            )}
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}

export default MessageList;
