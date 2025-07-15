const Prompt = require('../models/promptModel');

exports.getPrompt = async (req, res, next) => {
  try {
    // Get random prompt from database
    const count = await Prompt.countDocuments();
    const random = Math.floor(Math.random() * count);
    const prompt = await Prompt.findOne().skip(random);
    
    res.json(prompt);
  } catch (err) {
    next(err);
  }
};
