import React from 'react';
import { View, FlatList, Text } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onTaskPress }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text>No hay tareas disponibles</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskItem task={item} onPress={() => onTaskPress(item)} />
      )}
    />
  );
};

export default TaskList;
