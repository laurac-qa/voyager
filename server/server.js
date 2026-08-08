const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const trips = [
  {
    id: "1",
    title: "Santorini, Greece",
    dates: "Jun 14 – Jun 21, 2026",
    summary: "Sunset dinners, cliffside villages, and a sail around the caldera.",
  },
  {
    id: "2",
    title: "Kyoto, Japan",
    dates: "Oct 3 – Oct 12, 2026",
    summary: "Temples, autumn leaves, and incredible food.",
  },
];

app.get("/api/trips", (req, res) => {
  res.json(trips);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});