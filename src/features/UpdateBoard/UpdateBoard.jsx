/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import MultiInput from "../../components/MultiInput";
import { generateIndex } from "../../utils/generateIndex";
import Button from "../../components/Button";
import { updateBoard } from "../../services/apiFeatures";
function UpdateBoard({ board, onCloseModal }) {
  const queryClient = useQueryClient();
  const boardColumns = board.columns.map((col) => ({
    _id: col._id,
    name: col.name,
    tasks: col.tasks,
  }));
  const [columnList, setcolumnList] = useState(boardColumns);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => updateBoard(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
      onCloseModal();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const handleAddColumn = () => {
    const keyIndex = generateIndex();
    setcolumnList((prevState) => [
      ...prevState,
      { _id: keyIndex, name: "", tasks: [] },
    ]);
  };

  const handleRemoveColumn = (indexKey) => {
    const columnCount = columnList.filter((sub) => sub._id !== indexKey);
    setcolumnList(columnCount);
  };

  const handleFormSubmit = (data) => {
    // Filter out the board name entry and process only column entries
    const columnEntries = Object.entries(data).filter(([key, _]) =>
      key.startsWith("column")
    );

    // Transform the column entries into the desired format
    const transformedColumns = columnEntries
      .map(([key, value]) => {
        const columnId = key.split(" ")[1];
        const column = columnList.find((col) => col._id === columnId);
        // If the column exists in the current state, include it with its tasks
        if (column) {
          return { ...column, name: value };
        }
        // If the column does not exist in the current state, it was removed and should not be included
        return null;
      })
      .filter(Boolean); // Remove any null entries resulting from removed columns

    // Create the final board object
    const boardObj = {
      _id: board._id,
      name: data.name,
      columns: transformedColumns,
    };

    mutate(boardObj);
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h2 className="text-grey-600 text-lg font-bold dark:text-white">
        Edit Board
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
          defaultValue={board.name}
          className="px-4 py-2 border border-grey-200 rounded bg-transparent dark:text-white"
          {...register("name")}
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-grey-200 font-bold text-xs dark:text-white">
          Columns
        </h3>
        {columnList.map((col) => (
          <MultiInput
            key={col._id}
            id={col._id}
            onClickHandler={handleRemoveColumn}
            register={register}
            registerName={"column"}
            name={col.name}
          />
        ))}
        <button
          type="button"
          className="p-2 bg-shades-purple rounded-full text-primary-300 font-bold text-sm dark:bg-white"
          onClick={handleAddColumn}
        >
          + Add New Column
        </button>
      </div>
      <Button>Save Changes</Button>
    </form>
  );
}

export default UpdateBoard;
