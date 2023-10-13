// App.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import TodoList from './component/TodoList';

const App = () => {
  return (
    <View style={styles.container}>
      <TodoList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default App;
