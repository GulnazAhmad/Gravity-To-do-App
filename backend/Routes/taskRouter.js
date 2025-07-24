import express from "express";
import {
  allTasks,
  createTask,
  deleteTask,
  searchTask,
  updateTask,
} from "../Controller/taskController.js";
const taskrouter = express.Router();
taskrouter.get("/alltask", allTasks);
taskrouter.get("/searchtask", searchTask);
taskrouter.delete("/deletetask/:id", deleteTask);
taskrouter.post("/createtask", createTask);
taskrouter.put("/updatetask/:id", updateTask);
export default taskrouter;
