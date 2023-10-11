import React, { useEffect, useState } from "react";
import Task from "./Task";
import axios from "axios";

const TaskList = ({ tasks, onEditTask, onDeleteTask, onToggleCompleted }) => {

  return (
    <ul className=" ">
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onToggleCompleted={onToggleCompleted}
        />
      ))}
    </ul>
  );
};

export default TaskList;
