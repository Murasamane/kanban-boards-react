/* eslint-disable react/prop-types */
function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-4 bg-primary-300 text-white font-bold text-sm rounded-3xl hover:opacity-80"
    >
      {children}
    </button>
  );
}

export default Button;
