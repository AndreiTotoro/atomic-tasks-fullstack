"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { FaCheck } from "react-icons/fa";
import { toast } from "sonner";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteTask } from "@/lib/actions/task.actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DeleteTaskButton({
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
    deleteTask(taskId);
    setIsLoading(false);
    router.refresh();
    toast.warning("Task deleted!");
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger>
          <Button
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : <FaRegTrashAlt />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete task</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
