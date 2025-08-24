const express = require('express');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { authenticateToken } = require('../middlewares/auth');
const router = express.Router();

router.get('/', authenticateToken, getAllTasks);
router.post('/', authenticateToken, createTask);
router.get('/:id', authenticateToken, getTaskById);
router.put('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, deleteTask);

module.exports = router;