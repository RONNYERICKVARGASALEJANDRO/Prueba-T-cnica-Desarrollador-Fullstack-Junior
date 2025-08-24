import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { taskService } from '../services/api';

const TaskDetailScreen = () => {
  const route = useRoute();
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaskDetail();
  }, [taskId]);

  const fetchTaskDetail = async () => {
    try {
      const response = await taskService.getTask(taskId);
      setTask(response);
    } catch (error) {
      console.error('Error fetching task details:', error);
      Alert.alert('Error', 'No se pudo cargar la tarea');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await taskService.updateTask(taskId, { status: newStatus });
      Alert.alert('Éxito', 'Estado de la tarea actualizado');
      fetchTaskDetail(); // Recargar los detalles
    } catch (error) {
      console.error('Error updating task:', error);
      Alert.alert('Error', 'No se pudo actualizar la tarea');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.center}>
        <Text>Tarea no encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>
        
        <View style={styles.statusContainer}>
          <Text style={styles.label}>Estado:</Text>
          <View style={[styles.status, { backgroundColor: getStatusColor(task.status) }]}>
            <Text style={styles.statusText}>{task.status}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Descripción:</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Fecha de vencimiento:</Text>
          <Text style={styles.value}>
            {new Date(task.due_date).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Asignado a:</Text>
          <Text style={styles.value}>
            {task.assignee ? task.assignee.username : 'No asignado'}
          </Text>
        </View>

        {task.file_url && (
          <View style={styles.section}>
            <Text style={styles.label}>Archivo adjunto:</Text>
            <TouchableOpacity style={styles.fileButton}>
              <Text style={styles.fileButtonText}>Ver archivo</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.label}>Cambiar estado:</Text>
          <View style={styles.statusButtons}>
            {['pendiente', 'en progreso', 'completada'].map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusButton,
                  task.status === status && styles.statusButtonActive
                ]}
                onPress={() => handleStatusChange(status)}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    task.status === status && styles.statusButtonTextActive
                  ]}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Comentarios</Text>
        {task.comments && task.comments.length > 0 ? (
          task.comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <Text style={styles.commentAuthor}>{comment.user.username}:</Text>
              <Text style={styles.commentText}>{comment.content}</Text>
              <Text style={styles.commentDate}>
                {new Date(comment.created_at).toLocaleDateString()}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noComments}>No hay comentarios</Text>
        )}
      </View>
    </ScrollView>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'pendiente': return '#f72585';
    case 'en progreso': return '#7209b7';
    case 'completada': return '#4cc9f0';
    default: return '#6c757d';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#212529',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#212529',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#495057',
  },
  value: {
    color: '#6c757d',
  },
  description: {
    color: '#6c757d',
    lineHeight: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginLeft: 10,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statusButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e9ecef',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: '#4361ee',
  },
  statusButtonText: {
    color: '#6c757d',
    fontWeight: 'bold',
  },
  statusButtonTextActive: {
    color: 'white',
  },
  fileButton: {
    backgroundColor: '#4361ee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  fileButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  comment: {
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    paddingVertical: 10,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#495057',
  },
  commentText: {
    color: '#6c757d',
    marginVertical: 5,
  },
  commentDate: {
    fontSize: 12,
    color: '#adb5bd',
  },
  noComments: {
    color: '#6c757d',
    textAlign: 'center',
    padding: 10,
  },
});

export default TaskDetailScreen;
