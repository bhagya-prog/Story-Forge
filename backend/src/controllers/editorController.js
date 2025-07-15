const Story = require('../models/storyModel');
const User = require('../models/userModel');

// List all stories for editor review (including drafts and private stories)
exports.listAllStories = async (req, res, next) => {
  try {
    const stories = await Story.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });
    res.json({ stories });
  } catch (err) {
    next(err);
  }
};

// Edit a story (update content, tags, or other metadata)
exports.editStory = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const { title, summary, genre, tags, isPublic } = req.body;

    const story = await Story.findByIdAndUpdate(
      storyId,
      { title, summary, genre, tags, isPublic },
      { new: true }
    ).populate('author', 'username');

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json({ story });
  } catch (err) {
    next(err);
  }
};

// List all users for editor review
exports.listAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('username email role isBanned')
      .populate('followers following')
      .sort({ createdAt: -1 });
    res.json({ users: users || [] });
  } catch (err) {
    next(err);
  }
};

// Toggle user ban status
exports.toggleUserBan = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.isBanned = !user.isBanned;
    await user.save();

    res.json({ message: `User ${user.isBanned ? 'banned' : 'unbanned'}`, user });
  } catch (err) {
    next(err);
  }
};
