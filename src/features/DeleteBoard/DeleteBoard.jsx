import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "../../services/apiFeatures";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
/* eslint-disable react/prop-types */
function DeleteBoard({ name = "", onCloseModal, id }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: () => deleteBoard(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const handleDelete = () => {
    mutate();
  };
  return (
    <motion.div
      className="flex flex-col gap-6"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      <h2 className="font-bold text-lg text-redish-300">Delete this board?</h2>
      <p className="font-medium text-sm text-grey-200">
        Are you sure you want to delete the ‘{name}’ board? This action will
        remove all columns and tasks and cannot be reversed.
      </p>
      <div className="flex items-center flex-col gap-4 sm:gap-0 sm:flex-row justify-between">
        <button
          className="py-2 px-16 rounded-3xl bg-redish-300 text-white text-sm font-bold"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="py-2 px-16 rounded-3xl bg-primary-300 text-white text-sm font-bold"
          onClick={onCloseModal}
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

export default DeleteBoard;
