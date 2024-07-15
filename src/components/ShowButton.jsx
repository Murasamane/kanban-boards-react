/* eslint-disable react/prop-types */
import show from "/images/show.png";

function ShowButton({ onOpen }) {
  return (
    <button
      className="bg-primary-300 fixed p-4 rounded-r-full bottom-8"
      onClick={onOpen}
    >
      <img src={show} alt="show sidebar" />
    </button>
  );
}

export default ShowButton;
