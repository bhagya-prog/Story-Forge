const Story = require('../models/storyModel');

exports.createStory = async (req, res, next) => {
  try {
    const { title, summary, genre, tags, coverImage, language, license, isPublic } = req.body;
    
    if (!title) return res.status(400).json({ error: 'Title is required' });
    
    const story = await Story.create({
      title,
      summary,
      genre,
      tags,
      coverImage,
      language,
      license,
      isPublic,
      author: req.user.id,
      versions: [{ content: '', author: req.user.id }]
    });
    
    res.status(201).json({ story });
  } catch (err) {
    next(err);
  }
};

exports.getStories = async (req, res, next) => {
  try {
    const stories = await Story.find({ isPublic: true })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
      
    res.json({ stories });
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
