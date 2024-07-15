import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function BoardCard({ data }) {
  const taskCount = data.columns
    .map((col) => col.tasks.length)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <Link
      to={`/${data._id}`}
      className="flex flex-col bg-white rounded-xl p-6 flex-1 gap-3 dark:bg-grey-400"
    >
      <h2 className="font-bold text-sm text-grey-600 dark:text-white">
        {data.name}
      </h2>
      <div className="flex items-center">
        <ul className="flex flex-col gap-3">
          <li className="flex items-center gap-2">
            <span className="text-xs font-bold text-grey-500 dark:text-white">
              Columns: {data?.columns?.length}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-xs font-bold text-grey-500 dark:text-white">
              Tasks: {taskCount}
            </span>
          </li>
        </ul>
      </div>
    </Link>
  );
}

export default BoardCard;
