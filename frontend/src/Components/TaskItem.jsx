//import React, { useContext } from "react";
import axios from "axios";
import { URL } from "../url";
import { MdDeleteForever } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
//import { UserContext } from "../context/UserContext";
const TaskItem = ({ task, onRefresh, highlightText }) => {
  //console.log("Task details:", task);
  //const { user } = useContext(UserContext);
  const handleDelete = async () => {
    try {
      await axios.delete(`${URL}/api/deletetask/${task._id}`, {
        withCredentials: true,
      });
      onRefresh(); // refresh task list
    } catch (e) {
      console.error("Delete failed:", e.message);
    }
  };
  const toggleCompleted = async () => {
    try {
      await axios.put(
        `${URL}/api/updatetask/${task._id}`,
        {
          completed: !task.completed,
        },
        { withCredentials: true }
      );
      onRefresh();
    } catch (e) {
      console.error("Update completed failed:", e.message);
    }
  };

  const toggleImportant = async () => {
    try {
      await axios.put(
        `${URL}/api/updatetask/${task._id}`,
        {
          important: !task.important,
        },
        { withCredentials: true }
      );
      onRefresh();
    } catch (e) {
      console.error("Update important failed:", e.message);
    }
  };
  const getHighlightedText = (text, highlight) => {
    //console.log("here is the highlight", highlight);
    if (!highlight) return text;

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };
  return (
    <li className="w-full flex flex-col sm:flex-row border p-4 justify-between items-start rounded shadow-md sm:items-center gap-4 bg-white/70 backdrop-blur-md font-bold">
      <div className="flex items-start sm:items-center sm:w-auto w-full items-center gap-5">
        <button onClick={toggleCompleted}>
          {task.completed ? (
            <MdCheckBox size={22} />
          ) : (
            <MdCheckBoxOutlineBlank size={20} />
          )}
        </button>
        <span
          className={`text-sm sm:text-base ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {getHighlightedText(task.task, highlightText)}
        </span>
      </div>
      <div className="flex gap-4 items-center self-end sm:self-auto">
        <button onClick={toggleImportant}>
          {task.important ? (
            <FaStar size={22} />
          ) : (
            <FaRegStar
              size={18}
              className={task.important ? "font-bold" : ""}
            />
          )}
        </button>
        <button onClick={handleDelete} className="text-red-500 hover:underline">
          <MdDeleteForever color="red" size={20} />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
