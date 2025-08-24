const express = require('express');
const { getAllUsers, getUsersForAssignment } = require('../controllers/userController');
const { authenticateToken, requireAdmin } = require('../middlewares/auth');
const router = express.Router();

// Solo administradores pueden ver todos los usuarios
router.get('/', authenticateToken, requireAdmin, getAllUsers);

// Cualquier usuario autenticado puede ver la lista para asignar tareas
router.get('/for-assignment', authenticateToken, getUsersForAssignment);

module.exports = router;