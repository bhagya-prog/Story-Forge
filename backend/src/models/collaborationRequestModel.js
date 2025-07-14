const mongoose = require('mongoose');

const collaborationRequestSchema = new mongoose.Schema({
  storyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Story',
    required: true 
  },
  requester: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  recipient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], 
    default: 'pending' 
  },
  message: {
    type: String,
    maxlength: 500
  }
}, { timestamps: true });

module.exports = mongoose.model('CollaborationRequest', collaborationRequestSchema);
