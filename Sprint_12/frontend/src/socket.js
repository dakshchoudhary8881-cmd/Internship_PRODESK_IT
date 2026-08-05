import { io } from 'socket.io-client';

<<<<<<< HEAD
const SERVER_URL = 'https://sprint-12-backend.vercel.app/';
=======
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'https://internship-prodesk-it.onrender.com';
>>>>>>> 607efbc (Fix WebSocket URLs and CORS for live deployment)

export function createSocket() {
  return io(SERVER_URL, {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    transports: ['websocket', 'polling'],
  });
}
