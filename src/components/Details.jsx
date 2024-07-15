/* eslint-disable react/prop-types */
import { useState } from "react";
import Checkbox from "./Checkbox";
import Select from "./Select";
import Menu from "./Menu";

export default function Details({
  task,
  columnId,
  taskId,
  columnList,
  onCloseModal,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isCompleted = task?.subtasks.filter(
    (sub) => sub.isCompleted === true
  ).length;

  return (
    <div className={`flex flex-col gap-6 relative`}>
      <div className="flex items-center gap-6 justify-between">
        <h2 className="font-bold text-lg text-grey-600 dark:text-white">
          {task.title}
        </h2>
        <button onClick={() => setMenuOpen((state) => !state)}>
          <img src="/images/dots.png" alt="menu dots" />
        </button>
      </div>
      {menuOpen && (
        <Menu
          title={task.title}
          id={task._id}
          columnId={columnId}
          task={task}
          columnList={columnList}
        />
      )}
      <p className="font-medium text-sm text-grey-200">
        {task.description || "there is no description at the moment"}
      </p>

      <div className="flex flex-col gap-4">
        <h3 className="text-grey-200 font-bold text-xs">
          Subtasks ({isCompleted} of {task.subtasks.length})
        </h3>
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            {task.subtasks.map((sub) => (
              <Checkbox
                key={sub._id}
                data={sub}
                columnId={columnId}
                taskId={taskId}
              />
            ))}
          </div>
          <Select
            columnList={columnList}
            currentColumn={columnId}
            taskId={taskId}
            onCloseModal={onCloseModal}
          />
        </form>
      </div>
    </div>
  );
}
