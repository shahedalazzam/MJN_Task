import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    const fetchTitleData = async () => {
      try {
        const response = await axios
          .get("https://task-project-c6jd.onrender.com/item/")
          .catch((err) => {
            if (err && err.response) {
              console.log("first");
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
  }, [tasks]);

  const addTask = async () => {
    if (taskText) {
      const response = await axios.post(
        "https://task-project-c6jd.onrender.com/item/add",
        { title: taskText }
      );
      if (response.status === 201) {
        setTasks([...tasks, taskText]);
        setTaskText("");
      }
    }
  };

  const removeTask =async (itemId) => {
    const response = await axios.delete(
      `https://task-project-c6jd.onrender.com/item/delete/${itemId}`
    );
  };

  const editTask = (index) => {
    setEditIndex(index);
    setEditTaskText(tasks[index]);
    setEditMode(true);
  };

  const updateTask = () => {
    if (editTaskText && editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = editTaskText;
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditTaskText("");
      setEditMode(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cont}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task ..."
          value={taskText}
          onChangeText={(text) => setTaskText(text)}
        />
        <TouchableOpacity style={styles.add} onPress={addTask}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            {editIndex === index && editMode ? (
              <View style={styles.update}>
                <TextInput
                  style={styles.upinput}
                  value={editTaskText}
                  onChangeText={(text) => setEditTaskText(text)}
                />
                <TouchableOpacity style={styles.button} onPress={updateTask}>
                  <Icon name="check" size={23} color="#9F45FF" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.taskText}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? "#4630EB" : undefined}
                />
                <Text style={styles.edinput}>{item.title}</Text>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => editTask(index)}
                  >
                    <Icon name="edit" size={22} color="#9F45FF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => removeTask(item._id)}
                  >
                    <Icon name="trash" size={22} color="#9F45FF" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  input: {
    width: windowWidth * 0.666,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  taskItem: {
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: "#9F45FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  taskText: {
    marginBottom: 10,
    marginTop: 10,
    width: windowWidth * 0.53,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
  },
  buttons: {
    flexDirection: "row",
  },
  add: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#9F45FF",
    width: windowWidth * 0.2,
  },
  cont: {
    marginTop: 50,
    height: 40,
    marginBottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  update: {
    height: 53,
    paddingLeft: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  upinput: {
    paddingRight: 15,
    width: windowWidth * 0.7,
  },
  edinput: {
    paddingLeft: 5,
    paddingRight: 15,
    width: windowWidth * 0.63,
  },
});

export default TodoList;
