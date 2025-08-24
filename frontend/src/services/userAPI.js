import api from './api';

export const userAPI = {
  getAll: () => api.get('/users/for-assignment'),
};

export default userAPI;