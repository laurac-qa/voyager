import { trips } from "../data/trips";
import TripCard from "./TripCard";

function FeaturedTrips() {
  return (
    <section className="featured-trips">
      {trips.map((trip) => (
        <TripCard
          key={trip.title}
          trip={trip}
        />
      ))}
    </section>
  );
}

export default FeaturedTrips;