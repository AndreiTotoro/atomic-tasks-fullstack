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

export async function getUncompletedTasks(userId: string) {
  await connectToDatabase();
  try {
    const tasks = await Task.find({ creator: userId, completed: false });
    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {
    console.log(error);
  }
}

export async function setTaskCompleted(taskId: string) {
  await connectToDatabase();
  try {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");
    task.completed = true;
    await task.save();
  } catch (error) {
    console.log(error);
  }
}
