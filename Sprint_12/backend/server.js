require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const healthRoute = require('./routes/health');
const { registerSocketEvents } = require('./socket/socketHandler');

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'https://sprint-12.vercel.app';

const app = express();

app.use(cors({ origin: CLIENT_URL, methods: ['GET', 'POST'] }));
app.use(express.json());

app.use('/api/health', healthRoute);

app.get('/', (req, res) => {
  res.json({ message: 'Ripple Chat Server', health: '/api/health' });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: CLIENT_URL, methods: ['GET', 'POST'] },
});

io.on('connection', (socket) => {
  registerSocketEvents(io, socket);
});

server.listen(PORT, () => {
  console.log('═══════════════════════════════════════');
  console.log(`  Ripple Chat Server`);
  console.log(`  Port: ${PORT}`);
  console.log(`  CORS: ${CLIENT_URL}`);
  console.log(`  Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log('═══════════════════════════════════════');
});
