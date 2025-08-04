import express from "express";
import {
  allTasks,
  createTask,
  deleteTask,
  searchTask,
  updateTask,
} from "../Controller/taskController.js";
import verifyToken from "../Middleware/authMiddleware.js";
const taskrouter = express.Router();
taskrouter.get("/alltask", verifyToken, allTasks);
taskrouter.get("/searchtask", verifyToken, searchTask);
taskrouter.delete("/deletetask/:id", verifyToken, deleteTask);
taskrouter.post("/createtask", verifyToken, createTask);
taskrouter.put("/updatetask/:id", verifyToken, updateTask);
export default taskrouter;
