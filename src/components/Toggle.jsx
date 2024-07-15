/* eslint-disable react/prop-types */
import light from "/images/light.png";
import dark from "/images/dark.png";
import hide from "/images/hide.png";

function Toggle({ onClose, onHandleDark, isDark }) {
  const toggleClass = isDark ? "animate-toggleDark" : "animate-toggleLight";
  return (
    <div className="flex flex-col gap-5 ">
      <div className="bg-grey-50 max-w-full w-64 mx-auto py-4 dark:bg-grey-500">
        <div className="flex items-center justify-center gap-6">
          <img src={light} alt="light mode" />
          <div className="bg-primary-300 rounded-full w-10 h-5 p-[3px] flex items-center">
            <button
              onClick={onHandleDark}
              className={`bg-white w-4 h-4 rounded-full transition-all animate-toggle ${toggleClass}`}
            ></button>
          </div>
          <img src={dark} alt="dark mode" />
        </div>
      </div>
      <div className="pr-6">
        <button
          className="flex w-full items-center gap-4 px-8 py-3.5 rounded-r-full text-grey-200 font-bold hover:text-primary-300 hover:bg-shades-purple dark:hover:bg-white"
          onClick={onClose}
        >
          <img src={hide} alt="hide sidebar" />
          Hide Sidebar
        </button>
      </div>
    </div>
  );
}

export default Toggle;
