const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true,
    enum: ['merge-request', 'comment', 'follow', 'reaction', 'collab-request'] 
  },
  recipient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  storyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Story' 
  },
  commentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Comment' 
  },
  read: { 
    type: Boolean, 
    default: false 
  },
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

// Index for faster querying
notificationSchema.index({ recipient: 1, read: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
