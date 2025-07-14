const mongoose = require('mongoose');

const flagSchema = new mongoose.Schema({
  storyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Story' 
  },
  commentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Comment' 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  reason: { 
    type: String, 
    required: true,
    enum: ['spam', 'harassment', 'inappropriate', 'other'] 
  },
  details: {
    type: String,
    maxlength: 500
  },
  resolved: { 
    type: Boolean, 
    default: false 
  },
  resolvedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, { timestamps: true });

// Ensure at least one content reference exists
flagSchema.pre('validate', function(next) {
  if (!this.storyId && !this.commentId) {
    this.invalidate('content', 'Must reference either a story or comment');
  }
  next();
});

module.exports = mongoose.model('Flag', flagSchema);
