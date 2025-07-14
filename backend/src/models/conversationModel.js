const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    validate: {
      validator: function(participants) {
        return participants.length >= 2 && participants.length <= 10;
      },
      message: 'Conversation must have between 2 and 10 participants'
    }
  }],
  messages: [{
    sender: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    content: { 
      type: String, 
      required: true,
      maxlength: 2000 
    },
    readBy: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }]
  }]
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);
