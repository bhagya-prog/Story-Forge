// backend/index.js

const http = require('http');
const app = require('./src/app'); // ✅ updated path
const { Server } = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('🔥 Socket connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
