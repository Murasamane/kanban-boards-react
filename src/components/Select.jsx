import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskColumn } from "../services/apiFeatures";

/* eslint-disable react/prop-types */
function Select({ columnList, currentColumn, taskId, onCloseModal }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (parameters) => updateTaskColumn(parameters),
    onSuccess: () => {
      onCloseModal();
      queryClient.invalidateQueries(["board"]);
    },
    onError: (err) => console.log(err),
  });
  const handleSelectChange = (e) => {
    const nextColumnId = e.target.value;
    mutate({
      columnId: currentColumn,
      taskId: taskId,
      destinationId: nextColumnId,
    });
  };

  return (
    <select
      className="bg-transparent px-4 py-2 border border-grey-200 rounded text-grey-200 dark:bg-grey-400 capitalize"
      onChange={handleSelectChange}
      defaultValue={currentColumn}
    >
      {columnList.map((col) => (
        <option key={col._id} value={col._id} className="capitalize">
          {col.name}
        </option>
      ))}
    </select>
  );
}

export default Select;
