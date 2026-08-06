import { useParams } from "react-router-dom";
import { trips } from "../data/trips";

function TripDetails() {
  const { tripId } = useParams();
  const trip = trips.find((item) => item.id === tripId);

  if (!trip) {
    return (
      <section className="trip-details">
        <h1>Trip not found</h1>
        <p>The requested trip could not be found.</p>
      </section>
    );
  }

  return (
    <section className="trip-details">
      <h1>{trip.title}</h1>
      <p className="trip-details-dates">{trip.dates}</p>
      <p className="trip-details-summary">{trip.summary}</p>
    </section>
  );
}

export default TripDetails;