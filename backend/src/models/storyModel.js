const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    maxlength: 100 
  },
  summary: {
    type: String,
    maxlength: 500
  },
  genre: [{ 
    type: String, 
    maxlength: 20 
  }],
  tags: [{ 
    type: String, 
    maxlength: 20 
  }],
  coverImage: String,
  language: { 
    type: String, 
    default: 'en' 
  },
  license: { 
    type: String, 
    enum: ['CC0', 'CC-BY', 'CC-BY-SA', 'All Rights Reserved'],
    default: 'CC-BY' 
  },
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  bookmarks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  isPublic: { 
    type: Boolean, 
    default: true 
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  forks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Story' 
  }],
  parentStory: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Story' 
  },
  versions: [{
    content: { 
      type: String, 
      // required: true 
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    description: {
      type: String,
      maxlength: 200
    }
  }],
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
    },
    paragraphRef: String
  }],
  draft: { 
    type: String, 
    default: '' 
  },
  lastSaved: Date,
  shareCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Indexes for better performance
storySchema.index({ author: 1, isArchived: 1 });
storySchema.index({ title: 'text', summary: 'text', tags: 'text' });

module.exports = mongoose.model('Story', storySchema);
