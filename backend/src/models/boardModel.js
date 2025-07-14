const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  clubId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Club',
    required: true 
  },
  posts: [{
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    content: { 
      type: String, 
      required: true,
      maxlength: 2000 
    },
    replies: [{
      author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
      },
      content: { 
        type: String, 
        required: true,
        maxlength: 1000 
      },
      createdAt: { 
        type: Date, 
        default: Date.now 
      }
    }],
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Board', boardSchema);
