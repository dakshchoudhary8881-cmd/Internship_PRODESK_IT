import { useState, useEffect, useCallback, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

function ChatRoom({ socket, username, room, onLeave }) {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState('');
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userCount, setUserCount] = useState(0);
  const [toasts, setToasts] = useState([]);
  const typingClearRef = useRef(null);

  const roomIcon = room === 'Developers' ? '👨‍💻' : '💬';

  const showToast = useCallback((text) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    const onMessage = (data) => {
      setMessages((prev) => [...prev, data]);
      if (data.isSystem && data.message.includes('joined')) {
        showToast(`🎉 ${data.message}`);
      }
    };

    const onTyping = ({ username: who }) => {
      setTypingUser(who);
      if (typingClearRef.current) clearTimeout(typingClearRef.current);
      typingClearRef.current = setTimeout(() => setTypingUser(''), 2000);
    };

    const onRoomUsers = ({ count }) => setUserCount(count);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive_message', onMessage);
    socket.on('user_typing', onTyping);
    socket.on('room_users', onRoomUsers);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive_message', onMessage);
      socket.off('user_typing', onTyping);
      socket.off('room_users', onRoomUsers);
      if (typingClearRef.current) clearTimeout(typingClearRef.current);
    };
  }, [socket, showToast]);

  const handleSend = useCallback((message) => {
    const time = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    socket.emit('send_message', { username, room, message, time });
  }, [socket, username, room]);

  const handleTyping = useCallback(() => {
    socket.emit('typing', { username, room });
  }, [socket, username, room]);

  const handleLeave = () => {
    socket.disconnect();
    onLeave();
  };

  return (
    <div className="chat-room">
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="chat-room-badge">{roomIcon}</div>
          <div className="chat-room-info">
            <h2>{room}</h2>
            <div className="chat-room-meta">
              <span>{userCount} online</span>
              <span>·</span>
              <span>{username}</span>
            </div>
          </div>
        </div>
        <div className="chat-header-right">
          <div className={`status-pill ${isConnected ? 'online' : 'offline'}`}>
            <span className="status-dot"></span>
            {isConnected ? 'Live' : 'Reconnecting'}
          </div>
          <button className="leave-btn" onClick={handleLeave}>Leave</button>
        </div>
      </div>

      <MessageList messages={messages} currentUsername={username} />
      <TypingIndicator typingUser={typingUser} />
      <MessageInput onSendMessage={handleSend} onTyping={handleTyping} />

      {toasts.length > 0 && (
        <div className="toast-stack">
          {toasts.map((t) => (
            <div key={t.id} className="toast-item">{t.text}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
