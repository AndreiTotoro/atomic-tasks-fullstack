import { model, models, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface ITask {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  dueDate: Date;
  completed: boolean;
  creator: IUser;
}

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date, required: false },
  completed: { type: Boolean, default: false },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

const Task = models.Task || model("Task", TaskSchema);

export default Task;
