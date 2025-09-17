const Lesson = require("../models/Lesson");
const Progress = require("../models/Progress");

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

exports.getNextVocab = async (req, res) => {
  try {
    const userId = req.user.id;
    const { module, level, limit = 1 } = req.query;

    // Find existing progress
    let progress = await Progress.findOne({ userId, module, level, step: "vocabulary" });
    let lastSeen = 0;
    if (progress) lastSeen = progress.lastSeenSequence;

    console.log(`User ${userId} last seen sequence: ${lastSeen}`);

    // Fetch next vocabulary
    const vocabList = await Lesson.aggregate([
      { $match: { module, level, step: "vocabulary" } },
      { $unwind: "$content.vocabulary" },
      { $match: { "content.vocabulary.sequence": { $gt: lastSeen } } },
      { $sort: { "content.vocabulary.sequence": 1 } },
      { $limit: parseInt(limit, 10) },
      {
        $project: {_id: 0, word: "$content.vocabulary.word", sequence: "$content.vocabulary.sequence", meanings: "$content.vocabulary.meanings", examples: { $ifNull: ["$content.vocabulary.examples", []] }
        }
      }
    ]);

    if (!vocabList || vocabList.length === 0) {
      return res.json({ msg: "No new vocabulary available", vocabulary: [] });
    }

    res.json({ vocabulary: vocabList });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};