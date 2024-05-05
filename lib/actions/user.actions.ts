"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import User, { IUser } from "@/lib/database/models/user.model";
import { CreateUserParams } from "@/types";

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    console.log(newUser, "newUser");
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}

export async function updateUsername(clerkId: string, user: string) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate(
      { clerkId },
      { username: user },
      { new: true }
    );

    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers() {
  await connectToDatabase();
  try {
    const users = await User.find();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

export async function changeTaskOfTheDayTimer(userId: string) {
  await connectToDatabase();
  try {
    const user: IUser | null = await User.findById(userId);
    if (!user) throw new Error("User not found");
    user.taskOfTheDayTimer = new Date(
      new Date().getTime() + 24 * 60 * 60 * 1000
    );
    await user.save();
    return user.taskOfTheDayTimer.getTime();
  } catch (error) {
    console.log(error);
  }
}

export async function getTaskOfTheDayTimer(userId: string) {
  await connectToDatabase();
  try {
    const user: IUser | null = await User.findById(userId);
    if (!user) throw new Error("User not found");
    return user.taskOfTheDayTimer.getTime();
  } catch (error) {
    console.log(error);
  }
}
