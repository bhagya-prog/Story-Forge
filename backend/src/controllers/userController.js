const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validatePassword = (password) => {
  if (password.length < 8) throw new Error('Password must be at least 8 characters');
};

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    validatePassword(password);
    
    const user = await User.create({ username, email, password });

    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json({ user: userResponse });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Include role in token payload
    const token = jwt.sign(
      { 
        id: user._id,
        role: user.role // <-- Add this line
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.json({ token, userId: user._id });
  } catch (err) {
    next(err);
  }
};


exports.addPoints = async (req, res, next) => {
  try {
    const { userId, points, source } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.points += points;
    await user.save();
    
    res.json({ 
      message: 'Points added successfully',
      newPoints: user.points 
    });
  } catch (err) {
    next(err);
  }
};

// Profile management endpoints
exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return profile data with defaults for missing fields
    const profile = {
      id: user._id,
      name: user.username || '', // Use username as name for compatibility
      username: user.username || '',
      email: user.email || '',
      bio: user.bio || '',
      avatar: user.avatar || '/placeholder-user.jpg',
      coverImage: user.coverImage || '/placeholder.jpg',
      twitter: user.twitter || '',
      github: user.github || '',
      website: user.website || '',
      location: user.location || '',
      followers: user.followers ? user.followers.length : 0,
      following: user.following ? user.following.length : 0,
      totalStories: user.totalStories || 0,
      totalLikes: user.totalLikes || 0,
      totalForks: user.totalForks || 0,
      joinDate: user.createdAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      points: user.points || 0
    };

    res.json(profile);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    console.log('Profile update request received:');
    console.log('User ID:', userId);
    console.log('Updates:', updates);

    // Fields that are allowed to be updated
    const allowedFields = ['username', 'bio', 'avatar', 'coverImage', 'location', 'website', 'twitter', 'github'];
    
    const updateData = {};
    
    // Handle regular fields
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        updateData[field] = updates[field];
      }
    });

    // If username is being updated, check if it's available
    if (updateData.username) {
      const existingUser = await User.findOne({ 
        username: updateData.username,
        _id: { $ne: userId } // Exclude current user
      });
      
      if (existingUser) {
        return res.status(400).json({ 
          error: 'Username is already taken. Please choose a different username.' 
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return updated profile data
    const profile = {
      id: user._id,
      name: user.username || '', // Use username as name for compatibility
      username: user.username || '',
      email: user.email || '',
      bio: user.bio || '',
      avatar: user.avatar || '/placeholder-user.jpg',
      coverImage: user.coverImage || '/placeholder.jpg',
      twitter: user.twitter || '',
      github: user.github || '',
      website: user.website || '',
      location: user.location || '',
      followers: user.followers ? user.followers.length : 0,
      following: user.following ? user.following.length : 0,
      totalStories: user.totalStories || 0,
      totalLikes: user.totalLikes || 0,
      totalForks: user.totalForks || 0,
      joinDate: user.createdAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      points: user.points || 0
    };

    res.json(profile);
  } catch (err) {
    // Handle MongoDB duplicate key error
    if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
      return res.status(400).json({ 
        error: 'Username is already taken. Please choose a different username.' 
      });
    }
    next(err);
  }
};
