// this file automatically saves the draft of a story

const Story = require('../models/storyModel');

exports.autoSave = async (req, res, next) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.storyId,
      { draft: req.body.content },
      { new: true }
    );
    res.json(story);
  } catch (err) {
    next(err);
  }
};
