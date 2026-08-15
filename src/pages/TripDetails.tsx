import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Trip } from "../types/trip";
import { deleteTrip, getTrip } from "../services/tripsApi";

function TripDetails() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    async function loadTrip() {
      if (!tripId) {
        setNotFound(true);
        return;
      }

      try {
        const data = await getTrip(tripId);
        setTrip(data);
      } catch {
        setNotFound(true);
      }
    }

    loadTrip();
  }, [tripId]);

  async function handleDelete() {
    if (!tripId) {
      return;
    }

    setError("");

    try {
      await deleteTrip(tripId);
      navigate("/trips");
    } catch {
      setError("Unable to delete trip. Please try again.");
    }
  }

  if (notFound) {
    return (
      <main className="trip-details-page">
        <section className="trip-details-card">
          <Link to="/trips" className="back-link">
            ← Back to Trips
          </Link>

          <h1>Trip Not Found</h1>
        </section>
      </main>
    );
  }

  if (!trip) {
    return (
      <main className="trip-details-page">
        <section className="trip-details-card">
          <p>Loading trip...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="trip-details-page">
      <section className="trip-details-card">
        <Link to="/trips" className="back-link">
          ← Back to Trips
        </Link>

        <div className="trip-details-header">
          <h1>{trip.title}</h1>

          <div className="trip-details-actions">
            <Link
              to={`/trips/${trip.id}/edit`}
              className="trip-button"
              data-testid={`edit-trip-${trip.id}`}
            >
              Edit Trip
            </Link>

            <button
              type="button"
              className="trip-button delete-button"
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete Trip
            </button>
          </div>
        </div>

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

        {error && (
          <p
            role="alert"
            className="form-error"
          >
            {error}
          </p>
        )}
      </section>

      {showDeleteDialog && (
        <div
          className="delete-dialog-backdrop"
          onClick={() => setShowDeleteDialog(false)}
        >
          <div
            className="delete-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-trip-title"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="delete-dialog-badge">Warning</p>
            <h2 id="delete-trip-title">Delete this trip?</h2>
            <p>
              This action cannot be undone and will permanently remove
              {' "'}
              {trip.title}
              {'" '} from your saved trips.
            </p>

            <div className="delete-dialog-actions">
              <button
                type="button"
                className="trip-button secondary-button"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="trip-button danger-button"
                onClick={handleDelete}
              >
                Delete Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default TripDetails;