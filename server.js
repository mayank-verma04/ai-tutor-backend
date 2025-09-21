// server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./db");

const authRoutes = require("./routes/auth");
const lessonRoutes = require("./routes/lessons");
const compositionRoutes = require("./routes/composition");
const submitRoutes = require("./routes/submit");
const streakRoutes = require("./routes/streak");
const leaderboardRoutes = require("./routes/leaderboard");
const progressRoutes = require("./routes/progress");

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/composition", compositionRoutes);
// app.use("/api/submit", submitRoutes);
// app.use("/api/streak", streakRoutes);
// app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/progress", progressRoutes);

app.get("/api/", (req, res) => res.send("English Tutor API running..."));

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});


/*

Make a POST route for Composition Sentence Formation where when the user gets a prompt and he make a sentence formation using the hint (answer) given with it. After that he submits his answer then it will comes in the backend where backend will evaluates the sentence formation using LLM (GoogleGenerativeAI) where the LLM will will take the sentence prompt, user's sentence-formation and the hint. After that it will evaluate it and returns the result feedback, score and correct answer if wrong. After this it will be saved in results and also the progress for the particular sequence will be updated. ANd also other necessary steps will be done accordingly.

*/