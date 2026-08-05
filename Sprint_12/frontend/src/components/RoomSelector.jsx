const ROOMS = [
  { id: 'General', icon: '💬' },
  { id: 'Developers', icon: '👨‍💻' },
];

function RoomSelector({ selectedRoom, onRoomChange }) {
  return (
    <div className="room-selector">
      <span className="form-label">Choose Room</span>
      <div className="room-options">
        {ROOMS.map((room) => (
          <label key={room.id} className="room-option">
            <input
              type="radio"
              name="room"
              value={room.id}
              checked={selectedRoom === room.id}
              onChange={(e) => onRoomChange(e.target.value)}
            />
            <div className="room-option-label">
              <span className="room-option-icon">{room.icon}</span>
              <span className="room-option-name">{room.id}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default RoomSelector;
