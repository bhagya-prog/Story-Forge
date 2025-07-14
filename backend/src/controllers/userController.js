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
    const { userId, points } = req.body;
    
    if (req.user.id !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { points } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.shareStory = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findById(storyId);
    if (!story) return res.status(404).json({ error: 'Story not found' });
    story.shareCount = (story.shareCount || 0) + 1;
    await story.save();
    res.json({ message: 'Story share count incremented', shareCount: story.shareCount });
  } catch (err) {
    next(err);
  }
};
