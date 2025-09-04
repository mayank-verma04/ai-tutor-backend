const express = require("express");
const { getLessons } = require("../controllers/lessonController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getLessons);

module.exports = router;
