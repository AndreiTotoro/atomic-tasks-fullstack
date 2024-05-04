"use server";

import { CreateTaskParams } from "@/types";
import { connectToDatabase } from "../database";
import User, { IUser } from "../database/models/user.model";
import Task, { ITask } from "../database/models/task-model";

export async function createTask(userId: string, data: CreateTaskParams) {
  await connectToDatabase();
  try {
    const user: IUser | null = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const task: ITask = await Task.create({
      title: data.taskName,
      description: data.taskDescription,
      creator: user._id,
    });

    if (data.isTaskOfTheDay) {
      user.taskOfTheDay = task._id;
      await user.save();
    }

    console.log(task);
  } catch (error) {
    console.log(error);
  }
}

export async function getUncompletedTasks(userId: string) {
  await connectToDatabase();
  try {
    const taskOfTheDay = await User.findById(userId).populate("taskOfTheDay");
    //fetch everything except the task of the day
    const tasks = await Task.find({
      creator: userId,
      _id: { $ne: taskOfTheDay?.taskOfTheDay?._id },
      completed: false,
    });
    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {
    console.log(error);
  }
}

export async function getTaskOfTheDay(userId: string) {
  await connectToDatabase();
  try {
    const user = await User.findById(userId).populate("taskOfTheDay");
    return user?.taskOfTheDay;
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
