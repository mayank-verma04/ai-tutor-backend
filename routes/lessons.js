const express = require("express");
const { getLessons, getNextVocab } = require("../controllers/lessonController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getLessons);

// Get next vocab
// GET /progress/vocab?module=Comprehension&level=Beginner&limit=5
router.get("/vocab", auth, getNextVocab);

module.exports = router;
