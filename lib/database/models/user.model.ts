import { Document, model, models, Schema } from "mongoose";
import { ITask } from "./task-model";

export interface IUser extends Document {
  _id: string;
  clerkId: string;
  email: string;
  username: string;
  totalPoints: number;
  currentStreak: number;
  taskOfTheDay: ITask | null;
  tasks: ITask[] | [];
  taskOfTheDayTimer: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  totalPoints: { type: Number, default: 0 },
  currentStreak: { type: Number, default: 0 },
  taskOfTheDay: { type: Schema.Types.ObjectId, ref: "Task" || null },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" } || []],
  taskOfTheDayTimer: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);

export default User;
