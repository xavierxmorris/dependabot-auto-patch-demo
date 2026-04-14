const express = require("express");
const _ = require("lodash");
const axios = require("axios");
const dayjs = require("dayjs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: dayjs().toISOString(),
    versions: {
      node: process.version,
      express: require("express/package.json").version,
      lodash: require("lodash/package.json").version,
      axios: require("axios/package.json").version,
      dayjs: require("dayjs/package.json").version,
    },
  });
});

// Example endpoint using lodash
app.get("/api/users", (_req, res) => {
  const users = [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" },
    { id: 3, name: "Charlie", role: "user" },
    { id: 4, name: "Diana", role: "admin" },
  ];
  const grouped = _.groupBy(users, "role");
  res.json(grouped);
});

// Example endpoint using axios
app.get("/api/joke", async (_req, res) => {
  try {
    const { data } = await axios.get(
      "https://official-joke-api.appspot.com/random_joke"
    );
    res.json(data);
  } catch {
    res.status(502).json({ error: "Failed to fetch joke" });
  }
});

// Example endpoint using dayjs
app.get("/api/time", (_req, res) => {
  res.json({
    utc: dayjs().toISOString(),
    unix: dayjs().unix(),
    formatted: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
