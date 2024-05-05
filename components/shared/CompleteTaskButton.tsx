"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setTaskCompleted } from "@/lib/actions/task.actions";
import { Button } from "../ui/button";
import { FaCheck } from "react-icons/fa";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CompleteTaskButton({
  taskId,
  isTaskOfTheDay = false,
}: {
  taskId: string;
  isTaskOfTheDay?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    await setTaskCompleted(taskId, isTaskOfTheDay);
    setIsLoading(false);
    router.refresh();
    isTaskOfTheDay
      ? toast.success("Task of the day completed! You have gained 3 points!")
      : toast.success("Task completed! You have gained 1 point!");
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger
          className="text-white bg-neutral-900 p-3 rounded-md"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : <FaCheck />}
        </TooltipTrigger>
        <TooltipContent>
          <p>Mark task as completed</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
