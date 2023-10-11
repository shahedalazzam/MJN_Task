import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";

const AddTaskForm = ({ onAddTask, darkTheme }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://task-project-c6jd.onrender.com/item/add", { title });
      if (response.status === 201) {
        onAddTask(response.data.data.title); // Update the task list
        setTitle(""); // Clear the input field
        setError("");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Error creating task");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={` ${
          darkTheme ? "bg-gray-800" : "bg-white"
        } w-full  flex space-x-2 items-center  rounded-lg px-4`}
      >
        <CiCirclePlus size={28} className="px-0 text-gray-500" />
        <input
          className=" bg-transparent w-full h-fit p-1 py-4 text-lg"
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className=" px-4 uppercase text-gray-500" type="submit">
          Add
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default AddTaskForm;
