import { getTaskOfTheDayTimer } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";

export type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  totalPoints: number;
  currentStreak: number;
  taskOfTheDay: null;
  tasks: [];
  taskOfTheDayTimer: Date;
  hasCompletedTaskOfTheDay: boolean;
};

export type CreateTaskParams = {
  taskName: string;
  taskDescription: string;
  isTaskOfTheDay: boolean;
};
