import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onRefresh, highlightText }) => {
  const filteredTasks = highlightText
    ? tasks.filter((task) =>
        task.task.toLowerCase().includes(highlightText.toLowerCase())
      )
    : tasks;
  if (filteredTasks.length === 0) {
    return <p className="text-gray-500">No tasks found.</p>;
  }

  return (
    <ul className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-4 grid gap-4">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onRefresh={onRefresh}
          highlightText={highlightText}
        />
      ))}
    </ul>
  );
};

export default TaskList;
