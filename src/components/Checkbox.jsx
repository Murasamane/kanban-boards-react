import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateSubtask } from "../services/apiFeatures";


/* eslint-disable react/prop-types */
export default function Checkbox({ data, taskId }) {
  const [isComplete, setIsComplete] = useState(data.isCompleted);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () =>
      updateSubtask(taskId, data._id, {
        isCompleted: isComplete,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function handleSubtaskChange() {
    setIsComplete((state) => !state);
    mutate();
  }
  return (
    <div className="bg-grey-50 w-[400] h-[40] grid grid-cols-[auto,1fr] items-center gap-4 p-3 rounded dark:bg-grey-500">
      <input
        type="checkbox"
        className="accent-primary-300 w-4 h-4"
        checked={isComplete}
        onChange={handleSubtaskChange}
        id={data._id}
      />
      <label
        htmlFor={data._id}
        className={`${
          isComplete ? "line-through text-grey-200" : ""
        } dark:text-white`}
      >
        {data.title}
      </label>
    </div>
  );
}
