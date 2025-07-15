// src/services/socketService.js
const Notification = require('../models/notificationModel');
const Story = require('../models/storyModel');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    
    // Join collaboration room
    socket.on('joinRoom', async (roomId) => {
      try {
        const story = await Story.findById(roomId);
        if (!story) {
          return socket.emit('error', 'Story not found');
        }
        
        socket.join(roomId);
        socket.to(roomId).emit('userJoined', {
          userId: socket.id,
          username: socket.user?.username || 'Anonymous'
        });
      } catch (err) {
        socket.emit('error', 'Failed to join room');
      }
    });
    
    // Real-time editing
    socket.on('edit', (data) => {
      socket.to(data.roomId).emit('contentUpdate', data);
    });
    
    // Real-time chat
    socket.on('chat', (data) => {
      io.to(data.roomId).emit('newMessage', {
        ...data,
        timestamp: new Date()
      });
    });
    
    // Notification subscription
    socket.on('subscribe', (userId) => {
      socket.join(`user_${userId}`);
    });
    
    // Disconnect handler
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
  
  // Notification emitter
  return {
    emitNotification: (userId, notification) => {
      io.to(`user_${userId}`).emit('notification', notification);
    }
  };
};
