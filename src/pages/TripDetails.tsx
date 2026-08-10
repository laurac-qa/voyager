import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Trip } from "../types/trip";
import { getTrip } from "../services/tripsApi";

function TripDetails() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadTrip() {
      if (!tripId) {
        setNotFound(true);
        return;
      }

      try {
        const data = await getTrip(tripId);
        setTrip(data);
      } catch {
        setNotFound(true);
      }
    }

    loadTrip();
  }, [tripId]);

  if (notFound) {
    return (
      <main className="trip-details">
        <h1>Trip Not Found</h1>
        <Link to="/trips">← Back to Trips</Link>
      </main>
    );
  }

  if (!trip) {
    return (
      <main className="trip-details">
        <p>Loading trip...</p>
      </main>
    );
  }

  return (
    <main className="trip-details">
      <Link to="/trips" className="back-link">
        ← Back to Trips
      </Link>

      <h1>{trip.title}</h1>

      <p
        className="trip-dates"
        data-testid="trip-dates"
      >
        {trip.dates}
      </p>

      <p
        className="trip-summary"
        data-testid="trip-summary"
      >
        {trip.summary}
      </p>
    </main>
  );
}

export default TripDetails;