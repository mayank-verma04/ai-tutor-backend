// services/aiScoringService.js
const genAI = require("../config/gemini");
const scoringConfig = require("../config/scoringConfig");

exports.evaluateWithAI = async (module, step, level, question, answer) => {
  const maxScore =
    scoringConfig[module]?.[step]?.[level] ||
    scoringConfig[module]?.[step] ||
    10;

  const levelWeight = scoringConfig.levelWeights[level] || 1.0;

  const prompt = `
You are an evaluator for English learning.
The student has written the following response for a ${module} exercise at ${level} level, step: ${step}. And the question asked was: ${question}

Answer:
"${answer}"

Evaluate the answer according to these categories (each 0–10):
1. Grammar accuracy
2. Vocabulary usage
3. Structure/organization
4. Creativity or clarity of ideas

Return a JSON object with:
{
  "grammar": <number>,
  "vocabulary": <number>,
  "structure": <number>,
  "creativity": <number>,
  "feedback": "<proper feedback on the users answer with proper suggestion and what to improve and what are the mistakes and how to improve them according to the level and step in simple language>"
}
Do not add anything else.
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  let cleanedText = text.replace(/```json\s*/, '').replace(/```/, '').trim();

  let rubric;
  try {
    rubric = JSON.parse(cleanedText);
  } catch (err) {
    throw new Error("Failed to parse AI response: " + cleanedText);
  }

  // --- Calculate raw score ---
  let rawScore =
    rubric.grammar + rubric.vocabulary + rubric.structure + rubric.creativity;

  // --- Apply level weight ---
  let weightedScore = Math.round(rawScore * levelWeight);

  // --- Cap at maxScore ---
  if (weightedScore > maxScore) weightedScore = maxScore;

  return {
    rubric,
    score: weightedScore,
    maxScore,
    feedback: rubric.feedback || "Good attempt."
  };
};