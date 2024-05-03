import { ITask } from "@/lib/database/models/task-model";
import { create } from "zustand";

type State = {
  uncompletedTasks: ITask[];
  setUncompletedTasks: (tasks: ITask[]) => void;
};

const useUncompletedTaskStore = create<State>((set) => ({
  uncompletedTasks: [],
  setUncompletedTasks: (tasks: ITask[]) => set({ uncompletedTasks: tasks }),
}));

export default useUncompletedTaskStore;
