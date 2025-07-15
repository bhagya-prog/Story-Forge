// this tells the server to archive stories in bulk

const Story = require('../models/storyModel');

exports.archiveStories = async (req, res, next) => {
  try {
    if (!req.body.storyIds || !Array.isArray(req.body.storyIds)) {
      return res.status(400).json({ error: 'Invalid story IDs' });
    }

    // ownership check
    await Story.updateMany(
      {
        _id: { $in: req.body.storyIds },
        author: req.user.id 
      },
      { isArchived: true }
    );
    
    res.json({ message: 'Stories archived' });
  } catch (err) {
    next(err);
  }
};
