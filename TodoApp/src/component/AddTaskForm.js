import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const AddTaskForm = ({ onAddTask, darkTheme }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://task-project-c6jd.onrender.com/item/add",
        { title }
      );
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
    <View
      style={[
        styles.container,
        darkTheme ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <MaterialIcons name="" size={30} color="blue" />
      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Button title="Add" onPress={handleSubmit} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
  },
  darkBackground: {
    backgroundColor: "gray",
  },
  lightBackground: {
    backgroundColor: "white",
  },
  icon: {
    fontSize: 28,
    color: "gray",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  errorText: {
    color: "red",
  },
});

export default AddTaskForm;
