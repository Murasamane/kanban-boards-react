/* eslint-disable react/prop-types */
import UpdateBoard from "../features/UpdateBoard/UpdateBoard";
import Button from "./Button";
import Modal from "./Modal";

function Empty({ board }) {
  return (
    <div className="place-content-center min-h-full">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-grey-200 font-bold text-lg text-center">
          This board is empty. Create a new column to get started.
        </h2>
        <Modal>
          <Modal.Open opens="createColumn">
            <Button>+ Add New Column</Button>
          </Modal.Open>
          <Modal.Window name="createColumn">
            <UpdateBoard board={board} />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default Empty;
