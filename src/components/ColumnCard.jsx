import Details from "./Details";
import Modal from "./Modal";

/* eslint-disable react/prop-types */
export default function ColumnCard({ task, columnId, columnList }) {
  const isComplete = task.subtasks.filter((sub) => sub.isCompleted).length;
  return (
    <div className="text-grey-600 hover:text-primary-300 dark:hover:text-primary-300 hover:cursor-pointer">
      <Modal>
        <Modal.Open opens="detail">
          <div className="rounded-lg bg-white px-4 py-6 flex flex-col gap-2 hover:text-inherit dark:hover:text-inherit drop-shadow-md dark:bg-grey-400">
            <h2 className="font-bold text-inherit text-sm hover:text-inherit dark:hover:text-inherit dark:text-white">
              {task.title}
            </h2>
            <p className="text-xs text-grey-200">
              {isComplete} of {task.subtasks.length || 0} substasks
            </p>
          </div>
        </Modal.Open>
        <Modal.Window name="detail">
          <Details
            task={task}
            columnId={columnId}
            taskId={task._id}
            columnList={columnList}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}
