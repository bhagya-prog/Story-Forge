// this file handles content moderation actions like flagging and resolving flags

const Flag = require('../models/flagModel');

exports.flagContent = async (req, res, next) => {
  try {
    const flag = await Flag.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(flag);
  } catch (err) {
    next(err);
  }
};

exports.resolveFlag = async (req, res, next) => {
  try {
    const flag = await Flag.findByIdAndUpdate(
      req.params.flagId,
      { resolved: true, resolvedBy: req.user.id },
      { new: true }
    );
    res.json(flag);
  } catch (err) {
    next(err);
  }
};
