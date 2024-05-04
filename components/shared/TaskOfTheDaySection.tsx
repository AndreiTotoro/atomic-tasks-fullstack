import { getTaskOfTheDay } from "@/lib/actions/task.actions";
import { ITask } from "@/lib/database/models/task-model";
import React from "react";
import CompleteTaskButton from "./CompleteTaskButton";

export default async function TaskOfTheDay({ userId }: { userId: string }) {
  const taskOfTheDay: ITask = await getTaskOfTheDay(userId);

  console.log(taskOfTheDay);

  return (
    <div className="lg:h-[280px] w-full  rounded-lg p-5 bg-neutral-500/20">
      <h1 className="font-bold text-center text-xl text-white">
        Task of the day
      </h1>

      {taskOfTheDay ? (
        <div className="flex justify-between items-center p-5 bg-neutral-500/40 rounded-lg mt-16">
          <div>
            <h1 className="text-white font-bold">{taskOfTheDay.title}</h1>
            <p className="text-white">{taskOfTheDay.description}</p>
          </div>
          <div>
            <CompleteTaskButton
              taskId={taskOfTheDay._id}
              isTaskOfTheDay={true}
            />
          </div>
        </div>
      ) : (
        <h1 className="text-white text-xl text-center pt-24">
          You currently don't have a task of the day. Consider adding one!
        </h1>
      )}
    </div>
  );
}
