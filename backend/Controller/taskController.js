import Task from "../Models/taskmodel.js";

export const createTask = async (req, res) => {
  try {
    const { task } = req.body;
    const newtask = await Task.create({
      task: task,
      completed: false,
    });

    return res.status(201).json(newtask);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json(e.message);
  }
};
export const allTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    return res.status(201).json(tasks);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json(e.message);
  }
};
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedTask);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json(e.message);
  }
};
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    return res.status(200).json("task has been deleted");
  } catch (e) {
    console.log(e.message);
    return res.status(500).json(e.message);
  }
};
export const searchTask = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({ error: "Keyword is required" });
    }
    const tasks = await Task.find({
      task: { $regex: keyword, $options: "i" },
    });
    return res.status(200).json(tasks);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json(e.message);
  }
};
