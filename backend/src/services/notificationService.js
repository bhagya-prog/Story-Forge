// services/notificationService.js
const Notification = require('../models/notificationModel');
const { emitNotification } = require('./socketService');

exports.notifyMergeRequest = async (authorId, requesterId, storyId) => {
  try {
    const notification = await Notification.create({
      recipient: authorId,
      type: 'merge-request',
      storyId: storyId,
      sender: requesterId
    });
    emitNotification(authorId, notification);
  } catch (err) {
    console.error('Failed to create notification:', err);
    throw err; 
  }
};
exports.notifyComment = async (recipientId, senderId, storyId, commentId) => {
  try {
    const notification = await Notification.create({
      recipient: recipientId,
      type: 'comment',
      storyId: storyId,
      commentId: commentId,
      sender: senderId
    });
    emitNotification(recipientId, notification);
  } catch (err) {
    console.error('Failed to create comment notification:', err);
    throw err;
  }
};
