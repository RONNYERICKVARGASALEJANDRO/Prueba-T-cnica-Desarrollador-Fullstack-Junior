import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskAPI } from '../services/taskAPI';
import { commentAPI } from '../services/commentAPI';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTask();
    fetchComments();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await taskAPI.getById(id);
      setTask(response.data);
    } catch (error) {
      setError('Error al cargar la tarea');
      console.error('Error fetching task:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentAPI.getByTaskId(id);
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await commentAPI.create(id, { content: newComment });
      setComments([response.data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentAPI.delete(commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!task) return <div>Tarea no encontrada</div>;

  return (
    <div className="task-detail-container">
      <div className="task-header">
        <button onClick={() => navigate('/tasks')} className="btn-secondary">
          ← Volver
        </button>
        <h1>{task.title}</h1>
        <span className={`status-badge ${task.status.toLowerCase()}`}>
          {task.status}
        </span>
      </div>

      <div className="task-content">
        <div className="task-info">
          <div className="task-description">
            <h3>Descripción</h3>
            <p>{task.description || 'Sin descripción'}</p>
          </div>

          <div className="task-meta">
            <div className="meta-item">
              <strong>Creada por:</strong> {task.createdBy.name}
            </div>
            {task.assignedTo && (
              <div className="meta-item">
                <strong>Asignada a:</strong> {task.assignedTo.name}
              </div>
            )}
            {task.dueDate && (
              <div className="meta-item">
                <strong>Fecha de vencimiento:</strong> {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
            <div className="meta-item">
              <strong>Creada el:</strong> {new Date(task.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="comments-section">
          <h3>Comentarios</h3>
          
          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
              rows="3"
            />
            <button type="submit" className="btn-primary">
              Agregar Comentario
            </button>
          </form>

          <div className="comments-list">
            {comments.length === 0 ? (
              <p>No hay comentarios aún.</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <strong>{comment.author.name}</strong>
                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="btn-danger btn-small"
                    >
                      Eliminar
                    </button>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;