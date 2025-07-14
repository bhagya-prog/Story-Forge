const User = require('../models/userModel');
const Story = require('../models/storyModel');
const Flag = require('../models/flagModel');

// Get admin dashboard stats
exports.getDashboard = async (req, res, next) => {
  try {
    const [userCount, storyCount, activeFlags] = await Promise.all([
      User.countDocuments(),
      Story.countDocuments(),
      Flag.countDocuments({ resolved: false })
    ]);
    
    res.json({
      userCount,
      storyCount,
      activeFlags
    });
  } catch (err) {
    next(err);
  }
};

// Manage user status
exports.manageUser = async (req, res, next) => {
  try {
    const { userId, action } = req.body;
    const user = await User.findById(userId);
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    switch (action) {
      case 'ban':
        user.isBanned = true;
        break;
      case 'unban':
        user.isBanned = false;
        break;
      case 'promote':
        user.role = 'admin';
        break;
      case 'demote':
        user.role = 'user';
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
    
    await user.save();
    res.json({ message: `User ${action} successful` });
  } catch (err) {
    next(err);
  }
};

// Resolve flagged content
exports.resolveFlag = async (req, res, next) => {
  try {
    const flag = await Flag.findByIdAndUpdate(
      req.params.flagId,
      { 
        resolved: true,
        resolvedBy: req.user.id,
        resolution: req.body.resolution
      },
      { new: true }
    ).populate('storyId commentId');
    
    if (!flag) return res.status(404).json({ error: 'Flag not found' });
    
    // to take action on content
    if (req.body.action === 'remove') {
      if (flag.storyId) {
        await Story.findByIdAndUpdate(flag.storyId, { isPublic: false });
      }
    }
    
    res.json(flag);
  } catch (err) {
    next(err);
  }
};
