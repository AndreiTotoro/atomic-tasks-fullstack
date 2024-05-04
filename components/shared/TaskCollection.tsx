import {
  getUncompletedTasks,
  setTaskCompleted,
} from "@/lib/actions/task.actions";
import { ITask } from "@/lib/database/models/task-model";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import CompleteTaskButton from "./CompleteTaskButton";
import CreateTaskDrawer from "./CreateTaskDrawer";

export default async function TaskCollection({ userId }: { userId: string }) {
  const uncompletedTasks = await getUncompletedTasks(userId);

  return (
    <div className=" lg:h-[605px] max-h-[605px] w-full overflow-y-auto rounded-lg p-5 bg-neutral-500/20">
      <h1 className="font-bold text-center text-xl mb-5 text-white">
        Your tasks
      </h1>
      <CreateTaskDrawer userId={userId} />
      <div>
        {uncompletedTasks?.length === 0 ? (
          <h1 className="text-white text-xl text-center pt-24">
            You currently don't have any tasks. Consider adding some!
          </h1>
        ) : (
          uncompletedTasks.map((task: ITask) => {
            return (
              <div
                key={task?._id}
                className="flex justify-between gap-2 items-center    p-5 bg-neutral-500/40 rounded-lg mt-5"
              >
                <div className="overflow-ellipsis overflow-hidden">
                  <h1 className="text-white font-bold">{task?.title}</h1>
                  <p className="text-white">{task?.description}</p>
                </div>
                <div>
                  <CompleteTaskButton taskId={task?._id} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
