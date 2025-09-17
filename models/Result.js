const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  answers: Object,
  aiFeedback: {
    score: Number,
    comments: String,
    correctedText: String
  },
  pointsAwarded: Number
}, {
    timestamps: true
  });

module.exports = mongoose.model("Result", resultSchema);
