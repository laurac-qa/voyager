import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTrip } from "../services/tripsApi";

function CreateTrip() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [dates, setDates] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    try {
      await createTrip({
        title,
        dates,
        summary,
      });

      navigate("/trips");
    } catch {
      setError("Unable to create trip. Please try again.");
    }
  }

  return (
    <main className="create-trip-page form-page">
      <Link to="/trips" className="back-link">
        ← Back to Trips
      </Link>

      <h1>Create Trip</h1>

      <form
        className="create-trip-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="trip-title">Trip Title</label>
        <input
            id="trip-title"
            name="title"
            type="text"
            placeholder="e.g. Paris, France"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={100}
            required
        />

        <label htmlFor="trip-dates">Travel Dates</label>
        <input
          id="trip-dates"
          name="dates"
          type="text"
          placeholder="e.g. Sep 10 – Sep 17, 2026"
          value={dates}
          onChange={(event) => setDates(event.target.value)}
          maxLength={50}
          required
        />

        <label htmlFor="trip-summary">Trip Summary</label>
        <textarea
          id="trip-summary"
          name="summary"
          placeholder="Describe your trip..."
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          maxLength={500}
          required
        />

        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}

        <button type="submit">Save Trip</button>
      </form>
    </main>
  );
}

export default CreateTrip;