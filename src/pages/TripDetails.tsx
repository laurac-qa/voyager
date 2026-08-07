import { Link, useParams } from "react-router-dom";
import { trips } from "../data/trips";

function TripDetails() {
  const { tripId } = useParams();

  const trip = trips.find((trip) => trip.id === tripId);

  if (!trip) {
    return (
      <main className="trip-details">
        <h1>Trip Not Found</h1>
        <Link to="/trips">← Back to Trips</Link>
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
//test
export default TripDetails;