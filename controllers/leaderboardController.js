const User = require("../models/User");

// Top by points
exports.getLeaderboard = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const users = await User.find({})
      .sort({ points: -1 })
      .limit(limit)
      .select("name points streak");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Top by streak
exports.getStreakboard = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const users = await User.find({})
      .sort({ "streak.count": -1 })
      .limit(limit)
      .select("name points streak");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
