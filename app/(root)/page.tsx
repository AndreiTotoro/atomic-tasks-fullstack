import { CreateTaskForm } from "@/components/shared/CreateTaskForm";
import { createUser } from "@/lib/actions/user.actions";
import { CreateUserParams } from "@/types";
import { auth } from "@clerk/nextjs/server";
import React, { useEffect } from "react";

export default async function page() {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <div className="text-violet-500">
      <CreateTaskForm
        userId={userId}
        type="create"
      />
    </div>
  );
}
