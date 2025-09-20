const express = require("express");
const { getLessons, getNextVocab, getNextSentences, getPassages, getPassageBySequence } = require("../controllers/lessonController");
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

module.exports = router;
