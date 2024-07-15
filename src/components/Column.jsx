/* eslint-disable react/prop-types */
import { useState } from "react";
import { generateRandomColor } from "../utils/generateColor";
import ColumnCard from "./ColumnCard";

export default function Column({ data, columnList, boardId }) {
  const [randColor] = useState(generateRandomColor());
  return (
    <div className="w-72 max-w-full flex-shrink-0">
      <h2 className="text-xs text-grey-200 font-bold mb-6 capitalize flex gap-3">
        <div
          style={{ backgroundColor: randColor }}
          className={`w-4 h-4 rounded-full`}
        ></div>{" "}
        {data.name} ({data.tasks.length || 0})
      </h2>

      <div className="flex flex-col gap-5">
        {data.tasks.map((task) => (
          <ColumnCard
            key={task._id}
            task={task}
            columnId={data._id}
            columnList={columnList}
            boardId={boardId}
          />
        ))}
      </div>
    </div>
  );
}
