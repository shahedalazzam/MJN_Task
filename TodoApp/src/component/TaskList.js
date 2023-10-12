import React from "react";
import { View, FlatList } from "react-native";
import Task from "./Task";

const TaskList = ({ tasks, onEditTask, onDeleteTask, onToggleCompleted }) => {
  return (
    <View>
      <FlatList
        data={tasks}
        keyExtractor={(task, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Task
            task={item}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onToggleCompleted={onToggleCompleted}
          />
        )}
      />
    </View>
  );
};

export default TaskList;
