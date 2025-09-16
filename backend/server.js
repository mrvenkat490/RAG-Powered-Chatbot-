require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createClient } = require("redis");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Redis Cloud connection
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.error("❌ Redis Client Error", err));
redisClient.connect();

// Simulated RAG response
const getSmartAnswer = (query) => {
  // You can enhance this with some keyword-based logic
  if (query.toLowerCase().includes("news")) return "📰 Here’s the latest news update!";
  if (query.toLowerCase().includes("ai")) return "🤖 AI is evolving rapidly this year.";
  return `Echo: ${query}`;
};

// Chat route
app.post("/chat", async (req, res) => {
  const { sessionId, query } = req.body;
  const answer = getSmartAnswer(query);

  // Save to Redis
  await redisClient.rPush(sessionId, JSON.stringify({ query, answer }));
  res.json({ answer });
});

// Get chat history
app.get("/history/:sessionId", async (req, res) => {
  const messages = await redisClient.lRange(req.params.sessionId, 0, -1);
  res.json(messages.map((m) => JSON.parse(m)));
});

// Reset chat
app.delete("/reset/:sessionId", async (req, res) => {
  await redisClient.del(req.params.sessionId);
  res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
