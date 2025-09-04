const Result = require("../models/Result");
const User = require("../models/User");
const Lesson = require("../models/Lesson");

exports.submit = async (req, res) => {
  try {
    const { lessonId, answers } = req.body;
    const userId = req.user.id;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ msg: "Lesson not found" });

    // Simple scoring (later replace with AI)
    let score = Math.floor(Math.random() * 100); // mock
    let pointsAwarded = score > 50 ? 10 : 5;

    const result = new Result({
      userId,
      lessonId,
      answers,
      aiFeedback: { score, comments: "", correctedText: "" },
      pointsAwarded
    });
    await result.save();

    // Update user points + streak
    const user = await User.findById(userId);
    const today = new Date().toDateString();
    const last = user.streak.lastActive ? user.streak.lastActive.toDateString() : null;

    if (last === today) {
      user.points += pointsAwarded;
    } else {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (last === yesterday) user.streak.count += 1;
      else user.streak.count = 1;

      user.streak.lastActive = new Date();
      user.points += pointsAwarded;
    }

    await user.save();

    res.json({ msg: "Submitted", result, userPoints: user.points, streak: user.streak });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
