import { model, models, Schema, Document } from "mongoose";
import { IUser } from "./user.model";

export interface ITask extends Document {
  title: string;
  description: string;
  createdAt: Date;
  dueDate?: Date;
  completed: boolean;
  creator: IUser | Schema.Types.ObjectId;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
  completed: { type: Boolean, default: false },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

const Task = models.Task || model<ITask>("Task", TaskSchema);

export default Task;
