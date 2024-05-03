"use server";

import { CreateTaskParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Task, { ITask } from "../database/models/task-model";

export async function createTask(userId: string, data: CreateTaskParams) {
  await connectToDatabase();
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    const task: ITask = await Task.create({
      title: data.taskName,
      description: data.taskDescription,
      creator: user._id,
    });
    console.log(task);
  } catch (error) {
    console.log(error);
  }
}
