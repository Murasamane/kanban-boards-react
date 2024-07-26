/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../../services/apiFeatures";
import { motion } from "framer-motion";
function Delete({ onCloseModal, title, id, columnId }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => deleteTask(columnId, id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      onCloseModal();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleDelete = () => {
    mutate();
  };
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex flex-col gap-6"
    >
      <h2 className="font-bold text-lg text-redish-300">Delete this task?</h2>
      <p className="font-medium text-sm text-grey-200">
        Are you sure you want to delete the ‘{title}’ task and its subtasks?
        This action cannot be reversed.
      </p>
      <div className="flex flex-col items-center sm:flex-row justify-between gap-4 sm:gap-0">
        <button
          className="py-2 px-16 rounded-3xl bg-redish-300 text-white text-sm font-bold w-full sm:w-auto"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="py-2 px-16 rounded-3xl bg-primary-300 text-white text-sm font-bold w-full sm:w-auto"
          onClick={onCloseModal}
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

export default Delete;
