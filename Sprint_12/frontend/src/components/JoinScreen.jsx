import { useState } from 'react';
import RoomSelector from './RoomSelector';

function JoinScreen({ onJoin }) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [errors, setErrors] = useState({});

  const handleJoin = (e) => {
    e.preventDefault();
    const trimmedName = username.trim();
    const newErrors = {};

    if (!trimmedName) {
      newErrors.username = 'Username is required';
    } else if (trimmedName.length < 2) {
      newErrors.username = 'At least 2 characters needed';
    } else if (trimmedName.length > 20) {
      newErrors.username = 'Must be under 20 characters';
    }

    if (!room) {
      newErrors.room = 'Please select a room';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onJoin(trimmedName, room);
  };

  return (
    <div className="join-screen">
      <div className="join-card">
        <div className="join-header">
          <div className="join-logo">R</div>
          <h1>Ripple</h1>
          <p>Join a room and start chatting in real time</p>
        </div>

        <form className="join-form" onSubmit={handleJoin}>
          <div className="form-group">
            <label className="form-label" htmlFor="username-input">Username</label>
            <input
              id="username-input"
              className="form-input"
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={20}
              autoFocus
              autoComplete="off"
            />
            <span className="form-error">{errors.username || ''}</span>
          </div>

          <RoomSelector
            selectedRoom={room}
            onRoomChange={(value) => {
              setRoom(value);
              if (errors.room) setErrors((prev) => ({ ...prev, room: '' }));
            }}
          />
          <span className="form-error">{errors.room || ''}</span>

          <button id="join-btn" type="submit" className="join-btn">
            Join Chat →
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinScreen;
