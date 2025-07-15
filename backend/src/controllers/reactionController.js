const Story = require('../models/storyModel');

exports.likeStory = async (req, res, next) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.storyId,
      { $addToSet: { likes: req.user.id } },
      { new: true }
    );
    
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    
    // Return the story with proper counts
    const transformedStory = {
      ...story.toObject(),
      likesCount: story.likes ? story.likes.length : 0,
      forksCount: story.forks ? story.forks.length : 0,
      viewsCount: story.viewCount || 0,
    };
    
    res.json(transformedStory);
  } catch (err) {
    next(err);
  }
};

exports.bookmarkStory = async (req, res, next) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.storyId,
      { $addToSet: { bookmarks: req.user.id } },
      { new: true }
    );
    res.json(story);
  } catch (err) {
    next(err);
  }
};
