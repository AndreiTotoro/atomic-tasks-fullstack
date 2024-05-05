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

export async function setTaskCompleted(
  taskId: string,
  isTaskOfTheDay: boolean
) {
  await connectToDatabase();
  try {
    const task: ITask | null = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");
    const user: IUser | null = await User.findById(task.creator);
    if (!user) throw new Error("User not found");

    task.completed = true;

    if (isTaskOfTheDay) {
      user.taskOfTheDay = null;
      user.totalPoints += 3;
      user.hasCompletedTaskOfTheDay = true;
    } else {
      user.totalPoints += 1;
    }

    await task.save();
    await user.save();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTask(taskId: string) {
  await connectToDatabase();
  try {
    const task: ITask | null = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");
    await task.deleteOne();
  } catch (error) {
    console.log(error);
  }
}
