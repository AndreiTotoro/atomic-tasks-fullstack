import {
  getUncompletedTasks,
  setTaskCompleted,
} from "@/lib/actions/task.actions";
import { ITask } from "@/lib/database/models/task-model";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import CompleteTaskButton from "./CompleteTaskButton";
import CreateTaskDrawer from "./CreateTaskDrawer";
import { Task } from "./Task";
import { getHasUserCompletedTaskOfTheDay } from "@/lib/actions/user.actions";

export default async function TaskCollection({ userId }: { userId: string }) {
  const uncompletedTasks = await getUncompletedTasks(userId);
  const hasUserCompletedTaskOfTheDay = await getHasUserCompletedTaskOfTheDay(
    userId
  );

  return (
    <div className=" lg:h-[535px] max-h-[535px] w-full overflow-y-auto rounded-lg p-5 bg-neutral-500/20">
      <h1 className="font-bold text-center text-xl mb-5 text-white">
        Your tasks
      </h1>
      <div className="w-full mx-auto">
        <CreateTaskDrawer
          hasUserCompletedTaskOfTheDay={hasUserCompletedTaskOfTheDay ?? false}
          userId={userId}
        />
      </div>
      <div className="flex flex-col gap-5 pt-5">
        {uncompletedTasks?.length === 0 ? (
          <h1 className="text-white text-xl text-center pt-5 lg:pt-24">
            You currently don't have any tasks. Consider adding some!
          </h1>
        ) : (
          uncompletedTasks.map((task: ITask) => {
            return (
              <Task
                isTaskOfTheDay={false}
                key={task._id}
                task={task}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
