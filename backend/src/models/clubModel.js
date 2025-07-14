const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true,
    maxlength: 50 
  },
  description: {
    type: String,
    maxlength: 500
  },
  genre: { 
    type: String, 
    required: true 
  },
  members: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  challenges: [{
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    startDate: { 
      type: Date, 
      required: true 
    },
    endDate: { 
      type: Date, 
      required: true,
      validate: {
        validator: function(endDate) {
          return endDate > this.startDate;
        },
        message: 'End date must be after start date'
      }
    },
    submissions: [{
      storyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Story',
        required: true 
      },
      userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
      },
      createdAt: { 
        type: Date, 
        default: Date.now 
      }
    }]
  }]
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);
