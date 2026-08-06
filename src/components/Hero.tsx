import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <p className="hero-tagline">Travel Planning Made Simple</p>

      <h1 className="hero-title">
        ✈ Voyager
      </h1>

      <h2 className="hero-subtitle">
        Plan unforgettable adventures.
      </h2>

      <p className="hero-description">
        Everything you need to organize your trips in one place.
        Create itineraries, keep track of destinations, and make every
        journey memorable.
      </p>
      
      <button
        type="button"
        className="hero-button"
        onClick={() => navigate("/trips")}
      >
        Start Planning
      </button>
    </section>
  );
}

export default Hero;