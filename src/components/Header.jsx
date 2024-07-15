/* eslint-disable react/prop-types */

import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import AddTask from "../features/AddTask/AddTask";
import DeleteBoard from "../features/DeleteBoard/DeleteBoard";
import { getColumnsInfo } from "../services/apiFeatures";
import Button from "./Button";
import Modal from "./Modal";
import darkLogo from "/images/darkLogo.png";
import dots from "/images/dots.png";
import logo from "/images/logo.png";

export default function Header({ isDark }) {
  const { boardId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["currentBoardActive", boardId],
    queryFn: () => getColumnsInfo(boardId),
  });

  return (
    <header className="bg-white px-6 py-8 flex items-center justify-between dark:bg-grey-400">
      <div className="flex items-center gap-8 md:gap-10">
        <Link to="/">
          <img src={!isDark ? logo : darkLogo} alt="main logo" />
        </Link>
        <div className="bg-grey-200 flex-1"></div>
        <h2 className="text-grey-600 font-bold text-lg dark:text-white capitalize md:text-2xl">
          {data ? data?.name : ""}
        </h2>
      </div>

      {boardId && !isLoading && (
        <div className="flex items-center gap-6">
          <Modal>
            <Modal.Open opens="task">
              <Button>+ Add New Task</Button>
            </Modal.Open>
            <Modal.Window name="task">
              <AddTask columns={data?.columns} boardId={data?._id} />
            </Modal.Window>
          </Modal>
          <Modal>
            <Modal.Open opens="deleteBoard">
              <img src={dots} alt="menu dots" />
            </Modal.Open>
            <Modal.Window name="deleteBoard">
              <DeleteBoard name={data?.name} id={data._id} />
            </Modal.Window>
          </Modal>
        </div>
      )}
    </header>
  );
}
