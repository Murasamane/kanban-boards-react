import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="text-redish-300 dark:text-white font-bold text-lg">
        Board Not Found
      </h2>
      <Link to="/" className="font-bold text-primary-300 text-lg">
        Go back
      </Link>
    </div>
  );
}

export default NotFound;
