// netlify/functions/leaderboard.js
// Persistent leaderboard using Netlify Blobs (built-in KV storage, free)
// Endpoints:
//   GET  /api/leaderboard          → returns top 50 scores
//   POST /api/leaderboard          → saves a new score  { name, score, level, difficulty }
//   DELETE /api/leaderboard?name=X → remove a player (teacher use)

const { getStore } = require("@netlify/blobs");

const BLOB_KEY = "scores";

async function getScores(store) {
  try {
    const raw = await store.get(BLOB_KEY, { type: "text" });
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function saveScores(store, scores) {
  await store.set(BLOB_KEY, JSON.stringify(scores));
}

exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  const store = getStore("leaderboard");

  // ── GET: fetch leaderboard ──────────────────────────────
  if (event.httpMethod === "GET") {
    const scores = await getScores(store);
    // Sort by score desc, then by date
    scores.sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date));
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(scores.slice(0, 50)),
    };
  }

  // ── POST: submit a score ────────────────────────────────
  if (event.httpMethod === "POST") {
    let body;
    try {
      body = JSON.parse(event.body);
    } catch {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
    }

    const { name, score, level, difficulty, questionsPerLevel } = body;

    if (!name || typeof score !== "number") {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "name and score required" }) };
    }

    // Sanitise name
    const cleanName = String(name).trim().slice(0, 30);
    if (!cleanName) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "name cannot be empty" }) };
    }

    const scores = await getScores(store);

    // Check if this player already has a higher score — keep personal best
    const existing = scores.findIndex(
      (s) => s.name.toLowerCase() === cleanName.toLowerCase()
    );

    const entry = {
      name: cleanName,
      score,
      level: level || 1,
      difficulty: difficulty || "normal",
      questionsPerLevel: questionsPerLevel || 5,
      date: new Date().toISOString(),
    };

    if (existing >= 0) {
      if (scores[existing].score < score) {
        // New personal best — replace
        scores[existing] = entry;
      }
      // Otherwise keep the old (higher) score
    } else {
      scores.push(entry);
    }

    await saveScores(store, scores);

    // Return rank
    scores.sort((a, b) => b.score - a.score);
    const rank = scores.findIndex((s) => s.name.toLowerCase() === cleanName.toLowerCase()) + 1;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, rank, total: scores.length }),
    };
  }

  // ── DELETE: remove a player (teacher panel) ─────────────
  if (event.httpMethod === "DELETE") {
    const name = event.queryStringParameters?.name;
    if (!name) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "name required" }) };
    }
    const scores = await getScores(store);
    const filtered = scores.filter(
      (s) => s.name.toLowerCase() !== name.toLowerCase()
    );
    await saveScores(store, filtered);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, removed: scores.length - filtered.length }),
    };
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
};
