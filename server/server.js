const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());


app.get("/api/trips", (req, res) => {
  const trips = db.prepare("SELECT * FROM trips").all();

  res.json(trips);
});

app.get("/api/trips/:tripId", (req, res) => {
  const trip = db
    .prepare("SELECT * FROM trips WHERE id = ?")
    .get(req.params.tripId);

  if (!trip) {
    return res.status(404).json({
      message: "Trip not found",
    });
  }

  res.json(trip);
});

app.post("/api/trips", (req, res) => {
  const { title, dates, summary } = req.body;

  const result = db
    .prepare(`
      INSERT INTO trips (title, dates, summary)
      VALUES (?, ?, ?)
    `)
    .run(title, dates, summary);

  const newTrip = db
    .prepare("SELECT * FROM trips WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(newTrip);
});

app.put("/api/trips/:tripId", (req, res) => {
  const { title, dates, summary } = req.body;

  const result = db
    .prepare(`
      UPDATE trips
      SET title = ?, dates = ?, summary = ?
      WHERE id = ?
    `)
    .run(title, dates, summary, req.params.tripId);

  if (result.changes === 0) {
    return res.status(404).json({
      message: "Trip not found",
    });
  }

  const updatedTrip = db
    .prepare("SELECT * FROM trips WHERE id = ?")
    .get(req.params.tripId);

  res.json(updatedTrip);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});