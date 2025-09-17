require("dotenv").config();
const express = require("express");
const connectDB = require("./db");

const authRoutes = require("./routes/auth");
const lessonRoutes = require("./routes/lessons");
const submitRoutes = require("./routes/submit");
const streakRoutes = require("./routes/streak");
const leaderboardRoutes = require("./routes/leaderboard");
const progressRoutes = require("./routes/progress");

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/submit", submitRoutes);
app.use("/api/streak", streakRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/progress", progressRoutes);

app.get("/api/", (req, res) => res.send("English Tutor API running..."));

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
