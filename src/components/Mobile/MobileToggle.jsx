/* eslint-disable react/prop-types */
import light from "/images/light.png";
import dark from "/images/dark.png";

function MobileToggle({ onHandleDark, isDark }) {
  console.log(isDark);
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
    </div>
  );
}

export default MobileToggle;
