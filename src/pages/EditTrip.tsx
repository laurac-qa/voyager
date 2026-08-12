import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTrip, updateTrip } from "../services/tripsApi";

function EditTrip() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [dates, setDates] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTrip() {
      if (!tripId) {
        setError("Trip not found.");
        return;
      }

      try {
        const trip = await getTrip(tripId);

        setTitle(trip.title);
        setDates(trip.dates);
        setSummary(trip.summary);
      } catch {
        setError("Unable to load trip. Please try again.");
      }
    }

    loadTrip();
  }, [tripId]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (!title || !dates || !summary) {
        setError("All fields are required.");
        return;
    }

    if (!tripId) {
      setError("Trip not found.");
      return;
    }

    try {
      await updateTrip(tripId, {
        title,
        dates,
        summary,
      });

      navigate("/trips");
    } catch {
      setError("Unable to update trip. Please try again.");
    }
  }

  return (
    <main className="create-trip-page form-page">
      <Link to="/trips" className="back-link">← Back to Trips</Link>

      <h1>Edit Trip</h1>

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

export default EditTrip;