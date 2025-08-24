import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from "../../contexts/TaskContext";import { userAPI } from "../../services/userAPI";


const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { addTask, updateTask, tasks } = useTasks();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'PENDING',
    dueDate: '',
    assignedToId: ''
  });

  useEffect(() => {
    fetchUsers();
    
    if (isEdit) {
      // Buscar la tarea en el contexto primero
      const existingTask = tasks.find(task => task.id === parseInt(id));
      if (existingTask) {
        setFormData({
          title: existingTask.title,
          description: existingTask.description || '',
          status: existingTask.status,
          dueDate: existingTask.dueDate ? existingTask.dueDate.split('T')[0] : '',
          assignedToId: existingTask.assignedToId || ''
        });
      } else {
        // Si no está en el contexto, podrías fetch directamente desde la API aquí
        setError('Tarea no encontrada en el contexto');
      }
    }
  }, [id, isEdit, tasks]);

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setError('Error al cargar la lista de usuarios');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await updateTask(id, formData);
      } else {
        await addTask(formData);
      }
      navigate('/tasks');
    } catch (error) {
      setError(error.response?.data?.error || 'Error al guardar la tarea');
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{isEdit ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Ingresa el título de la tarea"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe los detalles de la tarea"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Estado</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="PENDING">Pendiente</option>
            <option value="IN_PROGRESS">En Progreso</option>
            <option value="COMPLETED">Completada</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Fecha de Vencimiento</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="assignedToId">Asignar a</label>
          <select
            id="assignedToId"
            name="assignedToId"
            value={formData.assignedToId}
            onChange={handleChange}
          >
            <option value="">Seleccionar usuario</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/tasks')}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;