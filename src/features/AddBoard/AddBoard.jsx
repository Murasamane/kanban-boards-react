/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateIndex } from "../../utils/generateIndex";
import { createNewBoard } from "../../services/apiFeatures";
import { useNavigate } from "react-router-dom";
import MultiInput from "../../components/MultiInput";
import Button from "../../components/Button";

function AddBoard({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const [columnList, setcolumnList] = useState([]);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (board) => createNewBoard(board),
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      onCloseModal();
      navigate(`/`);
    },
  });
  const handleAddColumn = () => {
    const keyIndex = generateIndex();
    setcolumnList((prevState) => [...prevState, `${keyIndex}`]);
  };

  const handleFormSubmit = (data) => {
    const columns = [];
    const board = {
      name: data.name,
      columns,
    };
    for (const key of Object.entries(data)) {
      if (key[0].startsWith("column")) {
        columns.push({ name: key[1] });
      }
    }
    mutate(board);
  };
  const handleRemoveColumn = (indexKey) => {
    const columnCount = columnList.filter((sub) => sub !== indexKey);
    setcolumnList(columnCount);
  };
  return (
    <motion.form
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h2 className="text-grey-600 font-bold text-lg dark:text-white">
        Add New Board
      </h2>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="titleInput"
          className="text-grey-200 font-bold text-xs dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          id="titleInput"
          name="title"
          placeholder="e.g. Take coffee break"
          className="px-4 py-2 border border-grey-200 rounded bg-transparent dark:text-white"
          {...register("name")}
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-grey-200 font-bold text-xs dark:text-white">
          Columns
        </h3>
        <div className="flex flex-col gap-3 max-h-40 overflow-y-auto">
          {columnList.map((sub) => (
            <MultiInput
              key={sub}
              id={sub}
              onClickHandler={handleRemoveColumn}
              register={register}
              registerName={"column"}
            />
          ))}
        </div>
        <button
          type="button"
          className="p-2 bg-shades-purple rounded-full text-primary-300 font-bold text-sm dark:bg-white"
          onClick={handleAddColumn}
        >
          + Add New Column
        </button>
      </div>
      <Button>Create New Board</Button>
    </motion.form>
  );
}

export default AddBoard;
