/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import NavIcon from "../NavIcon";
import useLinks from "../../hooks/useLinks";
import Modal from "../Modal";
import AddBoard from "../../features/AddBoard/AddBoard";
import MobileToggle from "./MobileToggle";
import { useClick } from "../../hooks/useClick";

function Dropdown({ onHandleDark, isDark, onClose }) {
  const { boardId } = useParams();
  const ref = useClick(onClose);
  const { data, isLoading } = useLinks();

  if (isLoading) return null;

  const isActive = (path) => path === boardId;

  if (!data) return null;
  return (
    <div className="absolute top-[15%] left-0 flex z-50 p-4 bg-black bg-opacity-20 backdrop-blur w-screen h-screen">
      <div
        className="flex flex-col pt-4 bg-white ml-6 justify-between pb-12 dark:bg-grey-400 h-[330px] max-h-auto rounded-xl"
        ref={ref}
      >
        <nav className="pr-6 flex flex-col gap-5">
          <h2 className="font-bold text-grey-200 text-xs tracking-widest px-6">
            ALL BOARDS ({data.length})
          </h2>
          <ul className="flex flex-col justify-center">
            {data.map((link) => (
              <li key={link._id}>
                <Link
                  to={link._id}
                  className={`${
                    isActive(link._id)
                      ? "bg-primary-300 text-white"
                      : "text-grey-200"
                  } px-8 py-3.5 rounded-r-full hover:bg-shades-purple hover:text-primary-300 dark:hover:bg-white font-bold flex items-center gap-4 capitalize`}
                >
                  <NavIcon fill={isActive(link._id) ? "#fff" : "#828FA3"} />
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="px-6 py-3.5 flex items-center gap-4">
              <NavIcon fill="#635FC7" />
              <Modal>
                <Modal.Open opens="addBoard">
                  <button className="text-primary-300 font-bold text-sm">
                    + Create New Board
                  </button>
                </Modal.Open>
                <Modal.Window name="addBoard">
                  <AddBoard />
                </Modal.Window>
              </Modal>
            </li>
          </ul>
        </nav>

        <div className="flex items-center w-full p-4">
          <MobileToggle onHandleDark={onHandleDark} isDark={isDark} />
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
