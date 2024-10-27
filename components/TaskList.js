import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Task from './Task';

const TaskList = ({ tasks, toggleTaskDone }) => {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <Task task={item} toggleTaskDone={toggleTaskDone} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default TaskList;
