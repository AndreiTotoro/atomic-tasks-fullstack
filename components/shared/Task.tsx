import { ITask } from "@/lib/database/models/task-model";
import React from "react";
import CompleteTaskButton from "./CompleteTaskButton";
import DeleteTaskButton from "./DeleteTaskButton";

export const Task = ({ task }: { task: ITask }) => {
  return (
    <div
      key={task?._id}
      className="flex justify-between gap-2 items-center    p-5 bg-neutral-500/40 rounded-lg mt-5"
    >
      <div className="overflow-ellipsis overflow-hidden">
        <h1 className="text-white font-bold">{task?.title}</h1>
        <p className="text-white">{task?.description}</p>
      </div>
      <div className="flex gap-2">
        <CompleteTaskButton taskId={task?._id} />
        <DeleteTaskButton taskId={task?._id} />
      </div>
    </div>
  );
};
