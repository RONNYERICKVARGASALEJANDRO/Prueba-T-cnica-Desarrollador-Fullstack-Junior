const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCommentsByTaskId = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    const comments = await prisma.comment.findMany({
      where: { taskId: parseInt(taskId) },
      include: {
        author: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(comments);
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};

const createComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { content } = req.body;
    
    // Verificar que la tarea existe
    const task = await prisma.task.findUnique({
      where: { id: parseInt(taskId) }
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    const comment = await prisma.comment.create({
      data: {
        content,
        taskId: parseInt(taskId),
        authorId: req.user.id
      },
      include: {
        author: { select: { id: true, name: true, email: true } }
      }
    });
    
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ error: 'Error al crear comentario' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar que el comentario existe
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
      include: { author: true }
    });
    
    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrada' });
    }
    
    // Solo el autor o un administrador puede eliminar el comentario
    if (comment.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'No tienes permisos para eliminar este comentario' });
    }
    
    await prisma.comment.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Comentario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ error: 'Error al eliminar comentario' });
  }
};

module.exports = { getCommentsByTaskId, createComment, deleteComment };
