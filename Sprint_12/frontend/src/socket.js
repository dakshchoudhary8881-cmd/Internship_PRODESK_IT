import { io } from 'socket.io-client';

const SERVER_URL = 'https://sprint-12-backend.vercel.app';

export function createSocket() {
  return io(SERVER_URL, {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  });
}
