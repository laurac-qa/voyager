import type { Trip } from "../types/trip";
import { useEffect, useMemo, useState } from "react";
import TripCard from "../components/TripCard";
import { getTrips } from "../services/tripsApi";
import { Link } from "react-router-dom";

function Trips() {
  const [query, setQuery] = useState("");
  const [trips, setTrips] = useState<Trip[]>([]);
  useEffect(() => {
    async function loadTrips() {
      const data = await getTrips();
      setTrips(data);
    }

    loadTrips();
  }, []);

  const filteredTrips = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return trips;
    }

    return trips.filter((trip) => {
      const destinationText = trip.title.toLowerCase();
      return destinationText.includes(normalizedQuery);
    });
 }, [query, trips]);

  return (
    <section className="trips-page">
      <div className="trips-header">
        <h1>My Trips</h1>
        <Link to="/trips/new" className="create-trip-button" data-testid="create-trip-button">
          Create Trip
        </Link>
      </div>
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
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <p className="trip-empty">No trips match your search.</p>
      )}
    </section>
  );
}

export default Trips;