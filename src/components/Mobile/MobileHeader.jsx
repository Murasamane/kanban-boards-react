/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getColumnsInfo } from "../../services/apiFeatures";
import { Link, useParams } from "react-router-dom";
import logo from "/images/mobilelogo.png";
import dots from "/images/dots.png";
import dropdownLogo from "/images/dropdownLogo.png";
import Dropdown from "./Dropdown";
import Modal from "../Modal";
import DeleteBoard from "../../features/DeleteBoard/DeleteBoard";
import AddTask from "../../features/AddTask/AddTask";
import Button from "../Button";

function MobileHeader({ isDark, onHandleDark }) {
  const [dropdown, setDropdown] = useState(false);
  const { boardId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["currentBoardActive", boardId],
    queryFn: () => getColumnsInfo(boardId),
  });

  useEffect(() => {
    if (dropdown === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {};
  }, [dropdown]);

  const handleToggleDrop = () => {
    setDropdown((state) => !state);
  };

  const handleClose = () => {
    setDropdown(false);
  };
  return (
    <header className="bg-white px-6 py-8 flex items-center justify-between dark:bg-grey-400">
      <div className="flex items-center gap-1">
        <Link to="/">
          <img src={logo} alt="main logo" />
        </Link>
        <div className="bg-grey-200 flex-1"></div>

        <div className="flex items-center gap-2" onClick={handleToggleDrop}>
          <h2 className="text-grey-600 font-bold text-lg dark:text-white capitalize md:text-2xl">
            {data ? data?.name : ""}
          </h2>
          <img
            src={dropdownLogo}
            alt="dropdown"
            className={`${dropdown ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      {dropdown && (
        <Dropdown
          onHandleDark={onHandleDark}
          isDark={isDark}
          onClose={handleClose}
        />
      )}

      {boardId && !isLoading && (
        <div className="flex items-center gap-6">
          <Modal>
            <Modal.Open opens="task">
              <Button>
                <img src="/images/plus.png" alt="add task" />
              </Button>
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

export default MobileHeader;
