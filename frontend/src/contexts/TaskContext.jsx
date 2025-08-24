import React, { createContext, useContext, useState, useEffect } from 'react';
import { taskAPI } from '../services/taskAPI';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const useTasks = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await taskAPI.getAll();
      setTasks(response.data);
    } catch (error) {
      setError('Error al cargar las tareas');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const response = await taskAPI.create(taskData);
      // Actualizar el estado local con la nueva tarea
      setTasks(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await taskAPI.update(id, taskData);
      // Actualizar la tarea específica en el estado local
      setTasks(prev => prev.map(task => 
        task.id === parseInt(id) ? response.data : task
      ));
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskAPI.delete(id);
      // Eliminar la tarea del estado local
      setTasks(prev => prev.filter(task => task.id !== parseInt(id)));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  const value = {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};