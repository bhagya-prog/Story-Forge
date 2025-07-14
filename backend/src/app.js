// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./utils/errorHandler');
const http = require('http');
const socketIo = require('socket.io');
const passport = require('passport');
const initializeSocket = require('./services/socketService');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());


// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/bulk', require('./routes/bulkRoutes'));
app.use('/api/club', require('./routes/clubRoutes'));
app.use('/api/draft', require('./routes/draftRoutes'));
app.use('/api/editor', require('./routes/editorRoutes'));
app.use('/api/gamification', require('./routes/gamificationRoutes'));
app.use('/api/locale', require('./routes/localeRoutes'));
app.use('/api/mergeRequest', require('./routes/mergeRequestRoutes')); // Use only one
app.use('/api/moderation', require('./routes/moderationRoutes'));
app.use('/api/prompt', require('./routes/promptRoutes'));
app.use('/api/reaction', require('./routes/reactionRoutes'));
app.use('/api/stories', require('./routes/storyRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error handling (must be last middleware)
app.use(errorHandler);

// Socket.IO initialization
const { emitNotification } = initializeSocket(io);

// Export for notification service
module.exports.emitNotification = emitNotification;

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
