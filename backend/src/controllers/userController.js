const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    // Solo administradores pueden ver todos los usuarios
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Se requieren privilegios de administrador' });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

const getUsersForAssignment = async (req, res) => {
  try {
    // Usuarios normales pueden ver otros usuarios para asignar tareas
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios para asignación:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

module.exports = { getAllUsers, getUsersForAssignment };
