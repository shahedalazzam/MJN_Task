import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const fetchTitleData = async () => {
      try {
        const response = await axios
          .get("https://task-project-c6jd.onrender.com/item/")
          .catch((err) => {
            if (err && err.response) {
              console.log("Error: ", err.response.data.error);
            }
          });

        if (response && response.data) {
          setTasks(response.data.data.toDos);
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };
    fetchTitleData();
  }, []);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
  };

  const editTask = async (id, title) => {
    try {
      const response = await axios.patch(
        `https://task-project-c6jd.onrender.com/item/update/${id}`,
        {
          title,
        }
      );
      setTasks(response.data.data.updatedToDos);
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `https://task-project-c6jd.onrender.com/item/delete/${id}`
      );
      setTasks(response.data.data.newToDos);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCompleted = async (id) => {
    try {
      const response = await axios.patch(
        `https://task-project-c6jd.onrender.com/item/updatemark/${id}`
      );
      setTasks(response.data.data.updatedTodos);
    } catch (error) {
      console.error("Error updating username:", error);
    }

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getCompletedTasks = () => tasks.filter((task) => task.completed);
  const getRemainingTasks = () => tasks.filter((task) => !task.completed);

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
              {getRemainingTasks().length} tasks left
            </Text>
          </View>
          {tasks.length ? (
            tasks.map((task) => (
              <View
                key={task.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}
              >
                <Text style={{ color: darkTheme ? "#fff" : "#000" }}>
                  {task.title}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => toggleCompleted(task.id)}>
                    {task.completed ? (
                      <Feather name="check-circle" size={24} color="green" />
                    ) : (
                      <Feather name="circle" size={24} color="gray" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => editTask(task.id, "Updated Title")}>
                    <Feather name="edit" size={24} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTask(task.id)}>
                    <Feather name="trash-2" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 300,
              }}
            >
              <Text style={{ color: "#999" }}>Empty task</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
