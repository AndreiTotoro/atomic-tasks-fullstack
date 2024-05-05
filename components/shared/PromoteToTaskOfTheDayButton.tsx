"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { FaCheck } from "react-icons/fa";
import { toast } from "sonner";
import { FaCrown } from "react-icons/fa6";
import {
  deleteTask,
  promoteTaskToTaskOfTheDay,
} from "@/lib/actions/task.actions";
import { ObjectId } from "mongoose";

export default function PromoteToTaskOfTheDayButton({
  taskId,
  isTaskOfTheDay = false,
  userId,
  hasUserCompletedTaskOfTheDay,
}: {
  taskId: string;
  isTaskOfTheDay?: boolean;
  userId: string;
  hasUserCompletedTaskOfTheDay: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    promoteTaskToTaskOfTheDay(taskId, userId);
    setIsLoading(false);
    router.refresh();
    toast.success("Task promoted to task of the day!");
  };

  return (
    <Button
      onClick={handleClick}
      disabled={hasUserCompletedTaskOfTheDay || isLoading}
    >
      {isLoading ? "Loading..." : <FaCrown />}
    </Button>
  );
}
