type TripCardProps = {
  title: string;
  dates: string;
  summary: string;
};

function TripCard({ title, dates, summary }: TripCardProps) {
  const shortenedSummary = summary.length > 110 ? `${summary.slice(0, 107)}...` : summary;

  return (
    <article className="trip-card">
      <h3>{title}</h3>
      <p className="trip-dates">{dates}</p>
      <p className="trip-summary">{shortenedSummary}</p>
      <button type="button" className="trip-button">
        View
      </button>
    </article>
  );
}

export default TripCard;
