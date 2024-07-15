/* eslint-disable react/prop-types */

export default function MultiInput({
  register,
  onClickHandler,
  id,
  registerName,
  name = "",
}) {
  return (
    <div className="grid grid-cols-[1fr,auto] items-center gap-4">
      <input
        type="text"
        placeholder="e.g. Make coffee"
        defaultValue={name}
        id={id}
        className="px-4 py-2 border border-grey-200 rounded bg-transparent dark:text-white"
        {...register(`${registerName} ${id}`)}
      />
      <button
        type="button"
        className="text-grey-200 text-base"
        onClick={() => onClickHandler(id)}
      >
        X
      </button>
    </div>
  );
}
