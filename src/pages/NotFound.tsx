import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <h1>404</h1>

      <h2>Oops! Page not found.</h2>

      <p>
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link to="/" className="hero-button">
        Return Home
      </Link>
    </section>
  );
}

export default NotFound;