import { IUser } from "@/lib/database/models/user.model";

export type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  totalPoints: number;
  currentStreak: number;
  taskOfTheDay: null;
  tasks: [];
};

export type CreateTaskParams = {
  taskName: string;
  taskDescription: string;
  isTaskOfTheDay: boolean;
};
