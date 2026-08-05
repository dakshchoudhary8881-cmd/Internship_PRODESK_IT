import { useState, useRef, useCallback } from 'react';

function MessageInput({ onSendMessage, onTyping }) {
  const [message, setMessage] = useState('');
  const typingTimer = useRef(null);

  const emitTyping = useCallback(() => {
    onTyping();
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      typingTimer.current = null;
    }, 2000);
  }, [onTyping]);

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value.trim()) emitTyping();
  };

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setMessage('');
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
      typingTimer.current = null;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-bar">
      <input
        id="message-input"
        className="msg-input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoFocus
      />
      <button
        id="send-btn"
        className="send-btn"
        onClick={handleSend}
        disabled={!message.trim()}
        title="Send"
      >
        ➤
      </button>
    </div>
  );
}

export default MessageInput;
