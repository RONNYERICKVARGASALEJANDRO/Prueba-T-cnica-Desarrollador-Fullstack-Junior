import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const { tasks, loading, error, deleteTask } = useTasks();
  const { logout } = useAuth();

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  if (loading) return <div className="loading">Cargando tareas...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="task-list-container">
      <header className="task-header">
        <h1>Mis Tareas</h1>
        <div className="user-info">
          <Link to="/task/new" className="btn-primary">Nueva Tarea</Link>
          <button onClick={logout} className="btn-secondary">Cerrar Sesión</button>
        </div>
      </header>
      
      <div className="tasks-grid">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No hay tareas. ¡Crea una nueva!</p>
            <Link to="/task/new" className="btn-primary">Crear Primera Tarea</Link>
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`status-badge ${task.status.toLowerCase()}`}>
                  {task.status}
                </span>
              </div>
              <p className="task-description">{task.description}</p>
              
              <div className="task-meta">
                {task.dueDate && (
                  <div className="due-date">
                    <strong>Vence:</strong> {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
                {task.assignedTo && (
                  <div className="assigned-to">
                    <strong>Asignada a:</strong> {task.assignedTo.name}
                  </div>
                )}
              </div>
              
              <div className="task-actions">
                <Link to={`/task/${task.id}`} className="btn-secondary">Ver Detalles</Link>
                <Link to={`/task/edit/${task.id}`} className="btn-secondary">Editar</Link>
                <button 
                  onClick={() => handleDelete(task.id)}
                  className="btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;