// routes/lessons.js
const express = require("express");
const { getLessons, getNextVocab, getNextSentences, getPassages, getPassageBySequence, getNextSentenceFormation, getLetters, getLetterBySequence, getEssays, getEssayBySequence, getReports, getReportBySequence, getPersuasiveWritings, getPersuasiveWritingBySequence } = require("../controllers/lessonController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getLessons);

// GET /lessons/vocab?module=Comprehension&level=Beginner&limit=1
router.get("/vocab", auth, getNextVocab);

// GET /lessons/sentence?module=Comprehension&level=Beginner&limit=1
router.get("/sentence", auth, getNextSentences);

// GET /lessons/passage?module=Comprehension&level=Beginner
router.get("/passage", auth, getPassages);

// GET /lessons/passage/one?module=Comprehension&level=Beginner&sequence=1
router.get("/passage/one", auth, getPassageBySequence);

router.get("/sentence-formation", auth, getNextSentenceFormation );

router.get("/letters", auth, getLetters);
router.get("/letters/one", auth, getLetterBySequence);

router.get("/essays", auth, getEssays);
router.get("/essays/one", auth, getEssayBySequence);

router.get("/reports", auth, getReports);
router.get("/reports/one", auth, getReportBySequence);

router.get("/persuasive-writing", auth, getPersuasiveWritings);
router.get("/persuasive-writing/one", auth, getPersuasiveWritingBySequence);

module.exports = router;
