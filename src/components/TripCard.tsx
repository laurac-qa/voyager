import type { Trip } from "../types/trip";

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

      <button
        type="button"
        className="trip-button"
      >
        View Trip
      </button>
    </article>
  );
}

export default TripCard;