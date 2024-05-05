import { getTaskOfTheDay } from "@/lib/actions/task.actions";
import { ITask } from "@/lib/database/models/task-model";
import React from "react";

import Countdown from "react-countdown";
import { Task } from "./Task";

export default async function TaskOfTheDay({ userId }: { userId: string }) {
  const taskOfTheDay: ITask = await getTaskOfTheDay(userId);

  console.log(taskOfTheDay);

  return (
    <div className="w-full h-[175px] rounded-lg p-5 bg-neutral-500/20">
      <h1 className="font-bold mb-5 text-center text-xl text-white">
        Task of the day
      </h1>

      {taskOfTheDay ? (
        <Task task={taskOfTheDay} />
      ) : (
        <h1 className="text-white text-xl text-center ">
          You currently don't have a task of the day. Consider adding one!
        </h1>
      )}
    </div>
  );
}
