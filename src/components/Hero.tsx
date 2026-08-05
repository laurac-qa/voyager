import TripCard from './TripCard';

function Hero() {
  const trips = [
    {
      destination: 'Santorini, Greece',
      dates: 'Jun 14 – Jun 21, 2026',
      summary:
        'Sunset dinners, cliffside villages, and a sail around the caldera.',
    },
    {
      country: 'Italy',
      dates: 'May 10 – May 20, 2026',
      cities: ['Rome', 'Florence', 'Venice'],
      summary: 'Historic centers, art museums, and canal-side evenings.',
    },
    {
      destination: 'Kyoto, Japan',
      dates: 'Sep 03 – Sep 12, 2026',
      summary:
        'Temple visits, seasonal gardens, and a quiet river walk at dawn.',
    },
    {
      destination: 'Marrakech, Morocco',
      dates: 'Nov 18 – Nov 27, 2026',
      summary:
        'Markets, rooftop cafés, and a desert escape under the stars.',
    },
  ];

  return (
    <section className="hero-section">
      <div className="hero-intro">
        <p className="eyebrow">Travel planning made simple</p>
        <h1>✈️ Voyager</h1>
        <h2>Plan unforgettable adventures.</h2>
        <p className="hero-copy">
          Everything you need for your trips
          <br />
          in one place.
        </p>
        <button type="button" className="hero-cta">
          Start Planning
        </button>
      </div>

      <div className="trip-grid">
        {trips.map((trip) => {
          const title = trip.cities?.length ? trip.country ?? '' : trip.destination ?? '';
          const itinerarySummary = trip.cities?.length
            ? `${trip.cities.join(', ')}`
            : trip.summary;

          return (
            <TripCard
              key={`${title}-${trip.dates}`}
              title={title}
              dates={trip.dates}
              summary={itinerarySummary}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Hero;