// config/scoringConfig.js
module.exports = {
  levelWeights: {
    beginner: 1.0,
    intermediate: 1.2,
    advanced: 1.5
  },

  comprehension: {
    vocabulary: { beginner: 5, intermediate: 7, advanced: 10 },
    sentence: { beginner: 10, intermediate: 12, advanced: 15 },
    passage: { beginner: 15, intermediate: 20, advanced: 25 }
  },

  composition: {
    sentenceFormation: { beginner: 10, intermediate: 12 },
    shortParagraphs: { beginner: 20, intermediate: 25, advanced: 30 },
    tonePractice: { beginner: 20, intermediate: 25, advanced: 30 },
    letters: { advanced: 30 },
    essays: { advanced: 50 },
    reports: { advanced: 40 },
    persuasiveWriting: { advanced: 35 }
  }
};
