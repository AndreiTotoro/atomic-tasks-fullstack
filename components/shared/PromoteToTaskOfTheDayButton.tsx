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

export default function PromoteToTaskOfTheDayButton({
  taskId,
  isTaskOfTheDay = false,
  userId,
}: {
  taskId: string;
  isTaskOfTheDay?: boolean;
  userId: string;
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
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : <FaCrown />}
    </Button>
  );
}
