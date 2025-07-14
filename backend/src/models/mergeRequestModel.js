const mongoose = require('mongoose');

const mergeRequestSchema = new mongoose.Schema({
  storyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Story',
    required: true 
  },
  forkId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Story',
    required: true 
  },
  requester: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], 
    default: 'pending' 
  },
  justification: { 
    type: String, 
    required: true,
    maxlength: 1000 
  },
  comments: [{
    text: { 
      type: String, 
      required: true,
      maxlength: 1000 
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('MergeRequest', mergeRequestSchema);
