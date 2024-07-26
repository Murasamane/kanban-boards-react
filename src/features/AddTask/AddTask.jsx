/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { generateIndex } from "../../utils/generateIndex";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewTask } from "../../services/apiFeatures";
import Button from "../../components/Button";
import MultiInput from "../../components/MultiInput";

function AddTask({ columns, boardId, onCloseModal }) {
  const queryClient = useQueryClient();
  const [subtaskList, setSubtaskList] = useState([]);
  const { mutate } = useMutation({
    mutationFn: (dataObject) => createNewTask(dataObject),
    onSuccess: () => {
      queryClient.invalidateQueries();
      onCloseModal();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const handleAddSubtask = () => {
    const keyIndex = generateIndex();
    setSubtaskList((prevState) => [...prevState, `${keyIndex}`]);
  };

  const handleRemoveSubtask = (indexKey) => {
    const filteredSubtasks = subtaskList.filter((sub) => sub !== indexKey);
    setSubtaskList(filteredSubtasks);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    const subtasks = [];
    const taskObject = {
      title: data.title,
      description: data.description,
      status: data.status.split("-")[0],
      subtasks,
    };
    for (const key of Object.entries(data)) {
      if (key[0].startsWith("subtask")) {
        subtasks.push({ title: key[1], isCompleted: false });
      }
    }

    mutate({
      task: taskObject,
      columnId: data.status.split("-")[1],
    });
  };
  return (
    <motion.form
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h2 className="text-grey-600 font-bold text-lg dark:text-white">
        Add New Task
      </h2>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="titleInput"
          className="text-grey-200 font-bold text-xs dark:text-white"
        >
          Title
        </label>
        <input
          type="text"
          id="titleInput"
          name="title"
          placeholder="e.g. Take coffee break"
          className="px-4 py-2 border border-grey-200 rounded bg-transparent dark:text-white"
          {...register("title", { required: true })}
        />
        {errors.title && <p>Must have at title</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="descriptionInput"
          className="text-grey-200 font-bold text-xs dark:text-white"
        >
          Description
        </label>
        <input
          type="text"
          id="descriptionInput"
          name="description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
          recharge the batteries a little."
          className="px-4 py-2 border border-grey-200 rounded bg-transparent dark:text-white"
          {...register("description", { required: true })}
        />
        {errors.description && <p>Must have at description</p>}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-grey-200 font-bold text-xs dark:text-white">
          Subtasks
        </h3>
        <div className="flex flex-col gap-3 max-h-40 overflow-y-auto">
          {subtaskList.map((sub) => (
            <MultiInput
              key={sub}
              id={sub}
              onClickHandler={handleRemoveSubtask}
              register={register}
              registerName={"subtask-title"}
            />
          ))}
        </div>
        <button
          type="button"
          className="p-2 bg-shades-purple rounded-full text-primary-300 font-bold text-sm dark:bg-white"
          onClick={handleAddSubtask}
        >
          + Add New Subtask
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="statusSelect"
          className="text-grey-200 font-bold text-xs dark:text-white"
        >
          Status
        </label>
        <select
          name="statusSelect"
          id="statusSelect"
          className="border capitalize border-shades-greyish px-4 py-2 rounded inline-block text-xs text-grey-600 font-bold bg-transparent dark:text-white dark:bg-grey-400"
          {...register("status")}
        >
          {columns?.map((col) => (
            <option
              key={col._id}
              value={`${col.name}-${col._id}`}
              id={col._id}
              className="capitalize"
            >
              {col.name}
            </option>
          ))}
        </select>
      </div>
      <Button>Create Task</Button>
    </motion.form>
  );
}

export default AddTask;
