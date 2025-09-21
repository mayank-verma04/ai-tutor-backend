// controllers/evaluationController.js
const { evaluateWithAI } = require("../services/aiScoringService");
const { saveEvaluation } = require("../services/pointsService");

exports.evaluateAnswer = async (req, res) => {
  try {
    const { userId, module, step, level, sequence, answer } = req.body;

    const evaluation = await evaluateWithAI(module, step, level, answer);

    const result = await saveEvaluation(
      userId,
      module,
      step,
      level,
      sequence,
      answer,
      evaluation
    );

    res.json({
      evaluation,
      points: result
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
