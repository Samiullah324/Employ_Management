import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="page">
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Return to Dashboard</Link>
    </section>
  );
}

export default NotFoundPage;
