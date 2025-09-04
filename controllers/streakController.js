const User = require("../models/User");

exports.getStreak = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name points streak");
    if (!user) return res.status(404).json({ msg: "Not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
