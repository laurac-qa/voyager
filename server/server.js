const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

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

app.get("/api/trips/:tripId", (req, res) => {
  const trip = trips.find((trip) => trip.id === req.params.tripId);

  if (!trip) {
    return res.status(404).json({
      message: "Trip not found",
    });
  }

  res.json(trip);
});

app.post("/api/trips", (req, res) => {
  const newTrip = {
    id: String(trips.length + 1),
    title: req.body.title,
    dates: req.body.dates,
    summary: req.body.summary,
  };

  trips.push(newTrip);

  res.status(201).json(newTrip);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});