import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@tasks');
      if (jsonValue !== null) {
        setTasks(JSON.parse(jsonValue));
      }
    } catch (e) {
      Alert.alert("Error loading tasks");
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      const jsonValue = JSON.stringify(newTasks);
      await AsyncStorage.setItem('@tasks', jsonValue);
    } catch (e) {
      Alert.alert("Error saving tasks");
    }
  };

  const addTask = (task) => {
    const newTasks = [...tasks, { id: Date.now().toString(), title: task, done: false }];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const toggleTaskDone = (id) => {
    const newTasks = tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <AddTask addTask={addTask} />
      <TaskList tasks={tasks} toggleTaskDone={toggleTaskDone} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#aaa', 
  },
});
