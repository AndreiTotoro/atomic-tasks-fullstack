"use client";
import { setTaskCompleted } from "@/lib/actions/task.actions";
import React from "react";
import { Button } from "../ui/button";
import useUncompletedTaskStore from "@/store/useUncompletedTaskStore";

export default function CompleteTaskButton({ taskId }: { taskId: string }) {
  const { uncompletedTasks, setUncompletedTasks } = useUncompletedTaskStore();

  const handleClick = async () => {
    await setTaskCompleted(taskId);
    const updatedTasks = uncompletedTasks.filter((task) => task._id !== taskId);
    setUncompletedTasks(updatedTasks);
  };

  return <Button onClick={() => handleClick()}>Complete</Button>;
}
