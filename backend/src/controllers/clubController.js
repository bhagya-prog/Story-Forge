// this file handles club creation and joining functionality

const Club = require('../models/clubModel');

exports.createClub = async (req, res, next) => {
  try {
    const club = await Club.create(req.body);
    res.status(201).json(club);
  } catch (err) {
    next(err);
  }
};

exports.joinClub = async (req, res, next) => {
  try {
    const club = await Club.findByIdAndUpdate(
      req.params.clubId,
      { $addToSet: { members: req.user.id } },
      { new: true }
    );
    res.json(club);
  } catch (err) {
    next(err);
  }
};
