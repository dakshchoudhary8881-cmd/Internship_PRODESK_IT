require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const healthRoute = require('./routes/health');
const { registerSocketEvents } = require('./socket/socketHandler');

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'https://sprint-12.vercel.app';

const allowedOrigins = [
  CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'https://sprint-12.vercel.app',
  'https://internship-prodesk-it.onrender.com',
];

const app = express();

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());

app.use('/api/health', healthRoute);

app.get('/', (req, res) => {
  res.json({ message: 'Ripple Chat Server', health: '/api/health' });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

io.on('connection', (socket) => {
  registerSocketEvents(io, socket);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('═══════════════════════════════════════');
  console.log(`  Ripple Chat Server`);
  console.log(`  Port: ${PORT}`);
  console.log(`  CORS: ${allowedOrigins.join(', ')}`);
  console.log(`  Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log('═══════════════════════════════════════');
});
