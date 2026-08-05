const roomUsers = {};

function addUserToRoom(room, socketId, username) {
  if (!roomUsers[room]) roomUsers[room] = [];
  const exists = roomUsers[room].find((u) => u.socketId === socketId);
  if (!exists) roomUsers[room].push({ socketId, username });
}

function removeUserFromRooms(socketId) {
  for (const room in roomUsers) {
    const idx = roomUsers[room].findIndex((u) => u.socketId === socketId);
    if (idx !== -1) {
      const [removed] = roomUsers[room].splice(idx, 1);
      return { room, username: removed.username };
    }
  }
  return null;
}

function getRoomUserCount(room) {
  return roomUsers[room] ? roomUsers[room].length : 0;
}

function getRoomUsers(room) {
  return roomUsers[room] || [];
}

function registerSocketEvents(io, socket) {
  console.log('─────────────────────────────────────');
  console.log('Client Connected:');
  console.log(`  Socket ID: ${socket.id}`);
  console.log('─────────────────────────────────────');

  socket.on('join_room', ({ username, room }) => {
    socket.join(room);
    addUserToRoom(room, socket.id, username);
    socket.data.username = username;
    socket.data.room = room;

    console.log('─────────────────────────────────────');
    console.log('User Joined Room:');
    console.log(`  Username: ${username}`);
    console.log(`  Room: ${room}`);
    console.log(`  Socket ID: ${socket.id}`);
    console.log(`  Online in room: ${getRoomUserCount(room)}`);
    console.log('─────────────────────────────────────');

    socket.to(room).emit('receive_message', {
      username: 'System',
      message: `${username} has joined the room 🎉`,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true,
      }),
      isSystem: true,
    });

    io.to(room).emit('room_users', {
      room,
      users: getRoomUsers(room),
      count: getRoomUserCount(room),
    });
  });

  socket.on('send_message', (data) => {
    const { username, room, message, time } = data;
    if (!message || !message.trim() || !room || !username) return;

    console.log(`[${room}] ${username}: ${message.trim()}`);

    io.to(room).emit('receive_message', {
      username, room, message: message.trim(), time, socketId: socket.id,
    });
  });

  socket.on('typing', ({ username, room }) => {
    socket.to(room).emit('user_typing', { username, room });
  });

  socket.on('disconnect', () => {
    const removed = removeUserFromRooms(socket.id);

    console.log('─────────────────────────────────────');
    console.log('Client Disconnected');
    console.log(`  Socket ID: ${socket.id}`);

    if (removed) {
      console.log(`  Username: ${removed.username}`);
      console.log(`  Room: ${removed.room}`);

      socket.to(removed.room).emit('receive_message', {
        username: 'System',
        message: `${removed.username} has left the room 👋`,
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit', minute: '2-digit', hour12: true,
        }),
        isSystem: true,
      });

      io.to(removed.room).emit('room_users', {
        room: removed.room,
        users: getRoomUsers(removed.room),
        count: getRoomUserCount(removed.room),
      });
    }

    console.log('─────────────────────────────────────');
  });
}

module.exports = { registerSocketEvents };
