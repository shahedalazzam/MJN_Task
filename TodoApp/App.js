import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
// import TaskList from "./component/TaskList";
import AddTaskForm from "./src/component/AddTaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTaskData();
  }, []);

  const fetchTaskData = async () => {
    try {
      const response = await axios.get("https://task-project-c6jd.onrender.com/item/");
      if (response.data && response.data.data) {
        setTasks(response.data.data.toDos);
      }
    } catch (error) {
      setError("Error fetching task data. Please try again later.");
      console.error("Error fetching item data:", error);
    }
  };

  const addTask = async (title) => {
    try {
      const response = await axios.post('https://task-project-c6jd.onrender.com/item/add', { title });
      if (response.status === 201) {
        setTasks(response.data.data.toDos);
      }
    } catch (error) {
      setError("Error creating task. Please try again later.");
      console.error("Error creating task:", error);
    }
  };

  const editTask = async (id, title) => {
    try {
      const response = await axios.patch(`https://task-project-c6jd.onrender.com/item/update/${id}`, { title });
      if (response.data && response.data.data) {
        setTasks(response.data.data.toDos);
      }
    } catch (error) {
      setError("Error updating task. Please try again later.");
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`https://task-project-c6jd.onrender.com/item/delete/${id}`);
      if (response.data && response.data.data) {
        setTasks(response.data.data.toDos);
      }
    } catch (error) {
      setError("Error deleting task. Please try again later.");
      console.error("Error deleting task:", error);
    }
  };

  const toggleCompleted = async (id) => {
    try {
      const response = await axios.patch(`https://task-project-c6jd.onrender.com/item/updatemark/${id}`);
      if (response.data && response.data.data) {
        setTasks(response.data.data.toDos);
      }
    } catch (error) {
      setError("Error toggling task completion. Please try again later.");
      console.error("Error toggling task completion:", error);
    }
  };
  
  const clearError = () => {
    setError(null);
  };
  
  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };
  
  return (
    <View
    style={{
      flex: 1,
      backgroundColor: darkTheme ? "#333" : "#fff",
      alignItems: "center",
      paddingTop: 20,
    }}
    >
      <View
        style={{
          width: "90%",
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: darkTheme ? "#fff" : "#000",
            }}
          >
            My Tasks
          </Text>
          <TouchableOpacity onPress={toggleTheme}>
            {darkTheme ? (
              <Feather name="sun" size={32} color="#fff" />
              ) : (
                <Feather name="moon" size={32} color="#000" />
                )}
          </TouchableOpacity>
        </View>
                <AddTaskForm onAddTask={addTask} darkTheme={darkTheme} />
        <ScrollView
          style={{
            width: "100%",
            backgroundColor: darkTheme ? "#444" : "#fff",
            maxHeight: 500,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 3,
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
          >
            <Text style={{ color: "#999" }}>
              {tasks.filter(task => !task.is_completed).length} tasks left
            </Text>
          </View>
          {error && (
            <View style={{ backgroundColor: "red", padding: 10 }}>
              <Text style={{ color: "white" }}>{error}</Text>
              <TouchableOpacity onPress={clearError}>
                <Text style={{ color: "white" }}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          )}
          {tasks.map((task) => (
            <View
            key={task._id}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
            >
              
              {/* Render task details here */}
              <Text style={{ color: darkTheme ? "#fff" : "#000" }}>
                {task.title}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => toggleCompleted(task.id)}>
                  {task.is_completed ? (
                    <Feather name="check-circle" size={24} color="green" />
                    ) : (
                      <Feather name="circle" size={24} color="gray" />
                      )}
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
