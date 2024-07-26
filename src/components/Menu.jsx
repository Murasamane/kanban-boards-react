/* eslint-disable react/prop-types */
import Delete from "../features/Delete/Delete";
import EditTask from "../features/EditTask/EditTask";
import Modal from "./Modal";

export default function Menu({ title, id, columnId, task, columnList }) {
  return (
    <Modal>
      <div className="absolute flex flex-col items-start gap-4 rounded-lg max-w-full w-48 bg-white right-[-20%] top-10 p-4 dark:bg-grey-500">
        <Modal.Open opens="edit">
          <button type="button" className="font-medium text-sm text-grey-200">
            Edit Task
          </button>
        </Modal.Open>
        <Modal.Open opens="delete">
          <button type="button" className="font-medium text-sm text-redish-300">
            Delete Task
          </button>
        </Modal.Open>
      </div>
      <Modal.Window name="edit" childClass="child-modal" child="child-modal">
        <EditTask task={task} columnList={columnList} columnId={columnId} />
      </Modal.Window>
      <Modal.Window name="delete" child="child-modal">
        <Delete title={title} id={id} columnId={columnId} />
      </Modal.Window>
    </Modal>
  );
}
