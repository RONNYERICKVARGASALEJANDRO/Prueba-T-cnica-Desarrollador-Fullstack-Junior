const express = require('express');
const { getCommentsByTaskId, createComment, deleteComment } = require('../controllers/commentController');
const { authenticateToken } = require('../middlewares/auth');
const router = express.Router();

router.get('/task/:taskId', authenticateToken, getCommentsByTaskId);
router.post('/task/:taskId', authenticateToken, createComment);
router.delete('/:id', authenticateToken, deleteComment);

module.exports = router;