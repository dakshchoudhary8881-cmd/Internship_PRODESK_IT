import { useState, useRef, useCallback } from 'react';
import { createSocket } from './socket';
import JoinScreen from './components/JoinScreen';
import ChatRoom from './components/ChatRoom';

function App() {
  const [screen, setScreen] = useState('join');
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const socketRef = useRef(null);

  const handleJoin = useCallback((name, selectedRoom) => {
    const socket = createSocket();
    socketRef.current = socket;
    setUsername(name);
    setRoom(selectedRoom);

    socket.connect();
    socket.on('connect', () => {
      socket.emit('join_room', { username: name, room: selectedRoom });
    });

    setScreen('chat');
  }, []);

  const handleLeave = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setScreen('join');
    setUsername('');
    setRoom('');
  }, []);

  return (
    <div className="app-container">
      {screen === 'join' && <JoinScreen onJoin={handleJoin} />}
      {screen === 'chat' && socketRef.current && (
        <ChatRoom
          socket={socketRef.current}
          username={username}
          room={room}
          onLeave={handleLeave}
        />
      )}
    </div>
  );
}

export default App;
