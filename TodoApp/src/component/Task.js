import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, CheckBox } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Task = ({ task, onEditTask, onDeleteTask, onToggleCompleted, onAddTask }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setTitle(task.title);
  };

  const handleDone = () => {
    onEditTask(task._id, title);
    setEditing(false);
  };

  const handleDelete = () => {
    onDeleteTask(task._id);
  };

  const handleToggleCompleted = () => {
    onToggleCompleted(task._id);
  };

  const handleChange = (text) => {
    setTitle(text);
  };

  return (
    <View style={{ marginBottom: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      {editing ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <TextInput
            style={{ flex: 1, fontSize: 16 }}
            value={title}
            onChangeText={handleChange}
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={handleDone}>
              <MaterialCommunityIcons name="check" size={24} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel}>
              <MaterialCommunityIcons name="close" size={24} color="orange" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              value={task.is_completed}
              onValueChange={handleToggleCompleted}
            />
            <Text style={{
              fontSize: 16,
              textDecorationLine: task.is_completed ? 'line-through' : 'none',
              color: task.is_completed ? 'gray' : 'black',
            }}>
              {task.title}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={handleEdit}>
              <MaterialCommunityIcons name="pencil" size={24} color="yellow" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <MaterialCommunityIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Task;
