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
      
    // Transform stories to include proper counts
    const transformedStories = stories.map(story => ({
      ...story.toObject(),
      likesCount: story.likes ? story.likes.length : 0,
      forksCount: story.forks ? story.forks.length : 0,
      viewsCount: story.viewCount || 0,
    }));
      
    res.json({ stories: transformedStories });
  } catch (err) {
    next(err);
  }
};

exports.getStoryById = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate('author', 'username');
      
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    
    // Increment view count
    story.viewCount = (story.viewCount || 0) + 1;
    await story.save();
      
    // Transform story to include proper counts
    const transformedStory = {
      ...story.toObject(),
      likesCount: story.likes ? story.likes.length : 0,
      forksCount: story.forks ? story.forks.length : 0,
      viewsCount: story.viewCount || 0,
    };
      
    res.json({ story: transformedStory });
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

exports.updateStory = async (req, res, next) => {
  try {
    const { title, summary, genre, tags, coverImage, language, license, isPublic } = req.body;
    
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    
    // Check if user is the author
    if (story.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this story' });
    }
    
    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      { title, summary, genre, tags, coverImage, language, license, isPublic },
      { new: true }
    ).populate('author', 'username');
    
    // Transform story to include proper counts
    const transformedStory = {
      ...updatedStory.toObject(),
      likesCount: updatedStory.likes ? updatedStory.likes.length : 0,
      forksCount: updatedStory.forks ? updatedStory.forks.length : 0,
      viewsCount: updatedStory.viewCount || 0,
    };
    
    res.json({ story: transformedStory });
  } catch (err) {
    next(err);
  }
};

exports.deleteStory = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    
    // Check if user is the author
    if (story.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this story' });
    }
    
    await Story.findByIdAndDelete(req.params.id);
    res.json({ message: 'Story deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.forkStory = async (req, res, next) => {
  try {
    const originalStory = await Story.findById(req.params.id);
    if (!originalStory) {
      return res.status(404).json({ error: 'Story not found' });
    }
    
    const { title, isPrivate } = req.body;
    
    // Create forked story
    const forkedStory = await Story.create({
      title: title || `${originalStory.title} (Fork)`,
      summary: originalStory.summary,
      content: originalStory.content,
      genre: originalStory.genre,
      tags: [...(originalStory.tags || []), 'fork'],
      language: originalStory.language,
      license: originalStory.license,
      isPublic: !isPrivate,
      author: req.user.id,
      forkedFrom: originalStory._id,
      versions: [{ content: originalStory.content || '', author: req.user.id }]
    });
    
    // Add to original story's forks array
    await Story.findByIdAndUpdate(req.params.id, {
      $addToSet: { forks: forkedStory._id }
    });
    
    const populatedFork = await Story.findById(forkedStory._id).populate('author', 'username');
    
    // Transform story to include proper counts
    const transformedStory = {
      ...populatedFork.toObject(),
      likesCount: populatedFork.likes ? populatedFork.likes.length : 0,
      forksCount: populatedFork.forks ? populatedFork.forks.length : 0,
      viewsCount: populatedFork.viewCount || 0,
    };
    
    res.status(201).json({ story: transformedStory });
  } catch (err) {
    next(err);
  }
};
