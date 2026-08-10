const Database = require("better-sqlite3");

const db = new Database(process.env.DB_FILE || "voyager.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS trips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    dates TEXT NOT NULL,
    summary TEXT NOT NULL
  )
`);

const tripCount = db
  .prepare("SELECT COUNT(*) AS count FROM trips")
  .get();

if (tripCount.count === 0) {
  const insertTrip = db.prepare(`
    INSERT INTO trips (title, dates, summary)
    VALUES (?, ?, ?)
  `);

  insertTrip.run(
    "Santorini, Greece",
    "Jun 14 – Jun 21, 2026",
    "Sunset dinners, cliffside villages, and a sail around the caldera."
  );

  insertTrip.run(
    "Kyoto, Japan",
    "Oct 3 – Oct 12, 2026",
    "Temples, autumn leaves, and incredible food."
  );
}

module.exports = db;