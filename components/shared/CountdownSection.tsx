"use client";
import { getTaskOfTheDayTimer } from "@/lib/actions/user.actions";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { toast } from "sonner";

export default function CountdownSection({ userId }: { userId: string }) {
  const [taskOfTheDayTimer, setTaskOfTheDayTimer] = useState<
    number | undefined
  >(0);

  useEffect(() => {
    async function fetchCountdown() {
      const taskOfTheDayTimer = await getTaskOfTheDayTimer(userId);
      setTaskOfTheDayTimer(taskOfTheDayTimer?.getTime());
    }
    fetchCountdown();
  }, []);

  const Completionist = () => {
    toast.success("Countdown completed!");
    return <span>You are good to go!</span>;
  };

  return (
    <div>
      <Countdown date={taskOfTheDayTimer}>
        <Completionist />
      </Countdown>
    </div>
  );
}
