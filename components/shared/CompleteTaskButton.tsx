"use client";
import { setTaskCompleted } from "@/lib/actions/task.actions";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function CompleteTaskButton({ taskId }: { taskId: string }) {
  const router = useRouter();

  const handleClick = async () => {
    await setTaskCompleted(taskId);
    router.refresh();
  };

  return <Button onClick={() => handleClick()}>Complete</Button>;
}
