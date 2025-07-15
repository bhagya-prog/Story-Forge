// streaks define karne ke liye
const User = require('../models/userModel');

exports.getLeaderboard = async (req, res, next) => {
  try {
    const users = await User.find().sort({ points: -1 }).limit(10);
    res.json(users);
  } catch (err) {
    next(err);
  }
};
