import { CreateTaskForm } from "@/components/shared/CreateTaskForm";
import TaskCollection from "@/components/shared/TaskCollection";
import TaskOfTheDaySection from "@/components/shared/TaskOfTheDaySection";
import { createUser } from "@/lib/actions/user.actions";
import { CreateUserParams } from "@/types";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React, { useEffect } from "react";

export default async function page() {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <div className="flex w-full gap-10 flex-col  lg:flex-row justify-between text-violet-500 mt-10">
      <SignedIn>
        <TaskCollection userId={userId} />
        <div className="flex w-full lg:w-1/2 flex-col gap-5">
          <TaskOfTheDaySection userId={userId} />
          <CreateTaskForm
            userId={userId}
            type="create"
          />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex pt-36 w-full justify-center">
          <div>
            <h1 className="text-2xl text-white font-bold">
              Welcome to Atomic To-Do
            </h1>
            <p className="text-lg mt-5 text-white">
              Please sign in to start creating tasks.
            </p>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}
