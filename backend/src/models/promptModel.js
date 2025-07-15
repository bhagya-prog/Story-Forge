const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    maxlength: 100 
  },
  setup: { 
    type: String, 
    required: true,
    maxlength: 500 
  },
  genre: { 
    type: String, 
    default: 'general',
    index: true 
  },
  tags: [{ 
    type: String, 
    maxlength: 20 
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  popularity: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Prompt', promptSchema);
