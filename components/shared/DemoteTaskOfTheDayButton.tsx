"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { FaCheck } from "react-icons/fa";
import { toast } from "sonner";
import { HiTrendingDown } from "react-icons/hi";
import {
  deleteTask,
  demoteTaskOfTheDay,
  promoteTaskToTaskOfTheDay,
} from "@/lib/actions/task.actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DemoteTaskOfTheDayButton({
  userId,
}: {
  userId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    demoteTaskOfTheDay(userId);
    setIsLoading(false);
    router.refresh();
    toast.warning("Task demoted from being task of the day!");
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          {" "}
          <Button
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : <HiTrendingDown />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Demote task from being the task of the day!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
