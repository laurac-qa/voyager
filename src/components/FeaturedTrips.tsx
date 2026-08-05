import TripCard from "./TripCard";
import { trips } from "../data/trips";

function FeaturedTrips() {
  return (
    <section className="featured-trips">
      {trips.map((trip) => (
        <TripCard
          key={trip.title}
          title={trip.title}
          dates={trip.dates}
          summary={trip.summary}
        />
      ))}
    </section>
  );
}

export default FeaturedTrips;