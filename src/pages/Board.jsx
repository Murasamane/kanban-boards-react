import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBoard } from "../services/apiFeatures";
import Column from "../components/Column";
import Empty from "../components/Empty";
import Modal from "../components/Modal";
import UpdateBoard from "../features/UpdateBoard/UpdateBoard";
import NotFound from "./NotFound";
import Loader from "../components/Loader";

export default function Board() {
  const { boardId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["board", boardId],
    queryFn: () => getBoard(boardId),
  });

  if (isLoading) return <Loader />;

  if (!data) return <NotFound />;
  if (data.columns.length < 1) return <Empty board={data} />;
  const columnList = data.columns.map((col) => ({
    _id: col._id,
    name: col.name,
  }));

  return (
    <div className="flex gap-6 h-full flex-shrink-0 overflow-x-auto custom-scrollbar">
      {data.columns.map((column) => (
        <Column
          key={column._id}
          data={column}
          columnList={columnList}
          boardId={boardId}
        />
      ))}
      <div className="flex flex-col justify-center py-10">
        <Modal>
          <Modal.Open opens="updateBoard">
            <button className="light-gradient dark-gradient flex-1 flex-shrink-1 p-14 font-bold hover:text-primary-300 dark:hover:text-primary-300 text-grey-200 text-2xl">
              + New Column
            </button>
          </Modal.Open>
          <Modal.Window name="updateBoard">
            <UpdateBoard board={data} />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}
