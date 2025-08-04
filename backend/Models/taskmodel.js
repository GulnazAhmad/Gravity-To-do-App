import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    important: {
      type: Boolean,
      default: false,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", TaskSchema);
export default Task;
