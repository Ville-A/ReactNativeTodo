import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Task = ({ task, toggleTaskDone }) => {
  return (
    <TouchableOpacity onPress={() => toggleTaskDone(task.id)}>
      <View style={styles.container}>
        <Text style={[styles.taskText, task.done && styles.doneText]}>
          {task.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  taskText: {
    fontSize: 18,
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});

export default Task;
