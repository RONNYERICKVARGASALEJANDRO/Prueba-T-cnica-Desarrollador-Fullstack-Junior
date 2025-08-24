import api from './api';

export const commentAPI = {
  getByTaskId: (taskId) => api.get(`/comments/task/${taskId}`),
  create: (taskId, commentData) => api.post(`/comments/task/${taskId}`, commentData),
  delete: (id) => api.delete(`/comments/${id}`),
};

export default commentAPI;