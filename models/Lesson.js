const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  module: { type: String, enum: ["Comprehension", "Composition"], required: true },
  level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
  unitNo: Number,
  step: { type: String, enum: ["vocabulary", "sentence", "passage", "one-word", "tone", "paragraph", "essay"] },
  content: Object,   // flexible JSON to hold vocab, sentences, passage, etc.
  source: { type: String, default: "core" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lesson", lessonSchema);
