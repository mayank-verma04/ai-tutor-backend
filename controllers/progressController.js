// controllers/progressController.js
const Lesson = require("../models/Lesson");
const Progress = require("../models/Progress");

exports.updateProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { module, level, lastSeenSequence } = req.body;
    const step = req.params.step; // e.g., "vocab", "sentence"

    let progress = await Progress.findOne({ userId, module, level, step });

    if (!progress) {
      progress = new Progress({ userId, module, level, step, lastSeenSequence });
    } else {
      progress.lastSeenSequence = lastSeenSequence;
      progress.updatedAt = new Date();
    }

    await progress.save();

    res.json({ msg: "Progress updated", progress });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
