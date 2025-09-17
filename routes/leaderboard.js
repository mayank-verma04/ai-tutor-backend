const express = require("express");
const { getLeaderboard, getStreakboard } = require("../controllers/leaderboardController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getLeaderboard);
router.get("/streak", auth, getStreakboard);

module.exports = router;
