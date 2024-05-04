"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setTaskCompleted } from "@/lib/actions/task.actions";
import { Button } from "../ui/button";

export default function CompleteTaskButton({ taskId }: { taskId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    await setTaskCompleted(taskId);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Complete"}
    </Button>
  );
}
