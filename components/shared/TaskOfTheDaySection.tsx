import { getTaskOfTheDay } from "@/lib/actions/task.actions";
import { ITask } from "@/lib/database/models/task-model";
import React from "react";

import { Task } from "./Task";
import { getHasUserCompletedTaskOfTheDay } from "@/lib/actions/user.actions";
import TaskOfTheDayCountdownTimer from "./TaskOfTheDayCountdownTimer";

export default async function TaskOfTheDay({ userId }: { userId: string }) {
  const taskOfTheDay: ITask = await getTaskOfTheDay(userId);
  const hasUserCompletedTaskOfTheDay = await getHasUserCompletedTaskOfTheDay(
    userId
  );

  console.log(taskOfTheDay);

  return (
    <div className="w-full h-[240px] flex flex-col justify-around rounded-lg p-5 bg-neutral-500/20">
      <h1 className="font-bold text-center text-xl text-white">
        Task of the day
      </h1>
      {hasUserCompletedTaskOfTheDay ? (
        <h1 className="text-center">
          You have already completed your task for the day! Great job! Come
          again tomorrow!
        </h1>
      ) : taskOfTheDay ? (
        <Task
          task={taskOfTheDay}
          isTaskOfTheDay={true}
        />
      ) : (
        <h1 className="text-white text-xl text-center ">
          You currently don't have a task of the day. Consider adding one!
        </h1>
      )}
      <div className="flex w-full justify-center">
        <TaskOfTheDayCountdownTimer
          hasUserCompletedTaskOfTheDay={hasUserCompletedTaskOfTheDay ?? false}
          userId={userId}
        />
      </div>
    </div>
  );
}
