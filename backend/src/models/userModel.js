const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
  },
  password: { 
    type: String, 
    required: true,
    minlength: 8,
    select: false 
  },
  bio: {
    type: String,
    maxlength: 500
  },
  points: { 
    type: Number, 
    default: 0 
  },
  badges: [{ 
    type: String,
    enum: ['contributor', 'writer', 'editor', 'champion', 'innovator'] 
  }],
  streak: { 
    type: Number, 
    default: 0 
  },
  lastActive: Date,
  role: { 
    type: String, 
    enum: ['user', 'editor', 'moderator', 'admin'], 
    default: 'user' 
  },
  followers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  following: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  preferences: {
    language: { type: String, default: 'en' },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' }
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Password validation method
userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Virtual for follower count
userSchema.virtual('followerCount').get(function() {
  return this.followers?.length || 0; 
});

// Virtual for following count
userSchema.virtual('followingCount').get(function() {
  return this.following?.length || 0; 
});

module.exports = mongoose.model('User', userSchema);
