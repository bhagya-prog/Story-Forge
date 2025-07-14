const Story = require('../models/storyModel');

exports.likeStory = async (req, res, next) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.storyId,
      { $addToSet: { likes: req.user.id } },
      { new: true }
    );
    res.json(story);
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
