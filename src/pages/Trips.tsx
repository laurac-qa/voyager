import { useMemo, useState } from "react";
import { trips } from "../data/trips";

function Trips() {
  const [query, setQuery] = useState("");

  const filteredTrips = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return trips;
    }

    return trips.filter((trip) => {
      const destinationText = trip.title.toLowerCase();
      return destinationText.includes(normalizedQuery);
    });
  }, [query]);

  return (
    <section className="trips-page">
      <h1>My Trips</h1>
      <p className="trips-intro">Search your saved trips in real time.</p>

      <input
        type="text"
        placeholder="Search destinations..."
        aria-label="Search trips"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="trip-search"
      />

      {filteredTrips.length > 0 ? (
        <div className="trip-list">
          {filteredTrips.map((trip) => (
            <article key={trip.id} className="trip-card">
              <h3>{trip.title}</h3>
              <p className="trip-dates">{trip.dates}</p>
              <p className="trip-summary">{trip.summary}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="trip-empty">No trips match your search.</p>
      )}
    </section>
  );
}

export default Trips;