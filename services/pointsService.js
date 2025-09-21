// services/pointsService.js
const User = require("../models/User");
const EvaluationResult = require("../models/EvaluationResult");

exports.saveEvaluation = async (userId, module, step, level, sequence, answer, evaluation) => {
  let evalRecord = await EvaluationResult.findOne({
    userId,
    module,
    step,
    level,
    sequence
  });

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (evalRecord) {
    // ✅ Update existing evaluation
    const oldScore = evalRecord.score || 0;

    evalRecord.answer = answer;
    evalRecord.rubric = evaluation.rubric;
    evalRecord.score = evaluation.score;
    evalRecord.maxScore = evaluation.maxScore;
    evalRecord.pointsAwarded = evaluation.score;
    evalRecord.updatedAt = new Date();

    await evalRecord.save();

    // Adjust user points (remove old, add new)
    user.points = (user.points || 0) - oldScore + evaluation.score;
    await user.save();

    return {
      success: true,
      updated: true,
      pointsAwarded: evaluation.score,
      totalPoints: user.points,
      evalId: evalRecord._id
    };

  } else {
    // ✅ New evaluation
    evalRecord = new EvaluationResult({
      userId,
      module,
      step,
      level,
      sequence,
      answer,
      rubric: evaluation.rubric,
      score: evaluation.score,
      maxScore: evaluation.maxScore,
      pointsAwarded: evaluation.score
    });

    await evalRecord.save();

    // Add points to user
    user.points = (user.points || 0) + evaluation.score;
    await user.save();

    return {
      success: true,
      updated: false,
      pointsAwarded: evaluation.score,
      totalPoints: user.points,
      evalId: evalRecord._id
    };
  }
};
