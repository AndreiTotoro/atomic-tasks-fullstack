import { getUncompletedTasks } from "@/lib/actions/task.actions";
import { ITask } from "@/lib/database/models/task-model";
import React from "react";

export default async function TaskCollection({ userId }: { userId: string }) {
  const uncompletedTasks = await getUncompletedTasks(userId);

  console.log(uncompletedTasks);

  return (
    <div className="h-[500px] w-full overflow-y-auto rounded-lg p-5 bg-neutral-500/20">
      <h1 className="font-bold text-center text-xl text-white">Your tasks</h1>
      <div>
        {uncompletedTasks.length === 0 ? (
          <h1>You currently don't have any tasks. Consider adding some!</h1>
        ) : (
          uncompletedTasks.map((task: ITask) => {
            return (
              <div
                key={task.id}
                className="flex justify-between items-center p-5 bg-neutral-500/40 rounded-lg mt-5"
              >
                <div>
                  <h1 className="text-white font-bold">{task.title}</h1>
                  <p className="text-white">{task.description}</p>
                </div>
                <div>
                  <button className="text-white">Complete</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
