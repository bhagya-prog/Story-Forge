const Conversation = require('../models/conversationModel');

exports.sendMessage = async (req, res, next) => {
  try {
    const conversation = await Conversation.findByIdAndUpdate(
      req.params.conversationId,
      { $push: { messages: { sender: req.user.id, content: req.body.content } } },
      { new: true }
    );
    res.json(conversation);
  } catch (err) {
    next(err);
  }
};
