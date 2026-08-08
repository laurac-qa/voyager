import type { Trip } from "../types/trip";
import { Link } from "react-router-dom";

interface TripCardProps {
  trip: Trip;
}

function TripCard({ trip }: TripCardProps) {
  const shortenedSummary =
    trip.summary.length > 110
      ? `${trip.summary.slice(0, 107)}...`
      : trip.summary;

  return (
    <article className="trip-card">
      <h3>{trip.title}</h3>

      <p className="trip-dates">
        {trip.dates}
      </p>

      <p className="trip-summary">
        {shortenedSummary}
      </p>

      <Link
        to={`/trips/${trip.id}`}
        className="trip-button"
        data-testid={`view-trip-${trip.id}`}
        >
        View Trip
      </Link>
    </article>
  );
}

export default TripCard;