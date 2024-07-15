/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { generateIndex } from "../../utils/generateIndex";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../../services/apiFeatures";
import MultiInput from "../../components/MultiInput";
import Button from "../../components/Button";
import { useParams } from "react-router-dom";

function EditTask({ task, columnList, onCloseModal, columnId }) {
  const { title, _id, description, subtasks, status } = task;
  const { boardId } = useParams();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (taskObj) => updateTask(taskObj),
    onSuccess: () => {
      queryClient.invalidateQueries();
      onCloseModal();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [subtaskList, setSubtaskList] = useState([...subtasks]);

  const handleAddSubtask = () => {
    const keyIndex = generateIndex();
    setSubtaskList((prevState) => [
      ...prevState,
      { _id: keyIndex, title: "", isCompleted: false },
    ]);
  };

  const handleRemoveSubtask = (indexKey) => {
    const filteredSubtasks = subtaskList.filter((sub) => sub._id !== indexKey);
    setSubtaskList(filteredSubtasks);
  };

  const handleFormSubmit = (data) => {
    const subtasks = [];
    for (const key of Object.entries(data)) {
      if (key[0].startsWith("subtask")) {
        subtasks.push({
          _id: key[0].split(" ")[1],
          title: key[1],
          isCompleted: false,
        });
      }
    }
    const subtasksFiltered = subtasks
      .filter((obj1) => subtaskList.some((obj2) => obj2._id === obj1._id))
      .map((sub) => ({ title: sub.title, isCompleted: sub.isCompleted }));
    const taskObject = {
      _id: _id,
      title: data.title,
      description: data.description,
      status: data.status.split("-")[0],
      subtasks: subtasksFiltered,
    };

    // console.log(taskObject);
    mutate({ task: taskObject, id: boardId,columnId:columnId });
  };
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h2 className="font-bold text-lg text-grey-600 dark:text-white">
        Edit Task
      </h2>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="taskTitle"
          className="font-bold text-grey-200 text-xs dark:text-white"
        >
          Title
        </label>
        <input
          type="text"
          id="taskTitle"
          className="border border-shades-greyish px-4 py-2 bg-transparent dark:text-white"
          {...register("title")}
          defaultValue={title}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="desc"
          className="font-bold text-grey-200 text-xs dark:text-white"
        >
          Description
        </label>
        <textarea
          id="desc"
          className="resize-none border border-shades-greyish w-full px-4 py-2 bg-transparent dark:text-white"
          defaultValue={description}
          {...register("description")}
        ></textarea>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-grey-200 font-bold text-xs dark:text-white">
          Subtasks
        </h3>
        {subtaskList.map((sub) => (
          <MultiInput
            key={sub._id}
            id={sub._id}
            onClickHandler={handleRemoveSubtask}
            register={register}
            registerName={"subtask-title"}
            name={sub.title}
          />
        ))}
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
          {columnList?.map((col) => (
            <option
              key={col.id}
              value={`${col.name}-${col.id}`}
              id={col.id}
              className="capitalize"
            >
              {col.name}
            </option>
          ))}
        </select>
      </div>
      <Button>Save Changes</Button>
    </form>
  );
}

export default EditTask;
