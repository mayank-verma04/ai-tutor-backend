const Lesson = require("../models/Lesson");

exports.getLessons = async (req, res) => {
  try {
    const { module, level, unitNo, step } = req.query;
    const filter = {};
    if (module) filter.module = module;
    if (level) filter.level = level;
    if (unitNo) filter.unitNo = unitNo;
    if (step) filter.step = step;

    const lessons = await Lesson.find(filter);
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
