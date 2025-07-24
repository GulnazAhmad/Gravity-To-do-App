import React, { useState } from "react";
import axios from "axios";
import { URL } from "../url";

const AddTask = ({ onTaskAdded }) => {
  const [task, setTask] = useState("");

  const handleAdd = async () => {
    if (!task.trim()) return;
    try {
      await axios.post(
        `${URL}/api/createtask`,
        {
          task,
          completed: false,
          important: false,
        },

        { withCredentials: true }
      );
      setTask("");
      onTaskAdded(); // refresh list
    } catch (e) {
      console.error("Failed to add task:", e.message);
    }
  };

  return (
    <div className="m-7 mb-6 flex gap-2 md:m-11">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border px-3 py-2 w-full rounded shadow"
        placeholder="Enter a new task"
      />
      <button
        onClick={handleAdd}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
};

export default AddTask;
