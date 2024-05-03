"use client";
import { setTaskCompleted } from "@/lib/actions/task.actions";
import React from "react";
import { Button } from "../ui/button";

export default function CompleteTaskButton({ taskId }: { taskId: string }) {
  return <Button onClick={() => setTaskCompleted(taskId)}>Complete</Button>;
}
