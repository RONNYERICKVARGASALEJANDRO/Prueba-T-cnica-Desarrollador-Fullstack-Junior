# 🧪 Prueba Técnica – Desarrollador Fullstack Junior

**Tecnologías clave:** React, React Native, Express, PostgreSQL  
**Duración estimada:** ⏱️ 3 días

---

## 1. Introducción
El objetivo de esta prueba es evaluar tus **habilidades técnicas**, **organización del código**, **nociones de arquitectura** y **buenas prácticas de desarrollo**.

---

## 2. Objetivo
Construir un **sistema de gestión de tareas colaborativas** con:

- 👥 Usuarios  
- 🔑 Autenticación  
- 🛡️ Roles  
- 💬 Comentarios en tareas  
- 🔄 Sincronización entre **web** y **móvil**

---

## 3. Requerimientos Funcionales

### 🔧 Backend (Node.js + Express + PostgreSQL)
- **Autenticación y autorización**
  - Registro y login con **JWT**
  - Roles: `user` y `admin`
  - Middleware para proteger rutas y validar roles
- **Gestión de tareas**
  - CRUD de tareas
  - Cada tarea incluye: título, descripción, estado (`pendiente`, `en progreso`, `completada`), fecha de vencimiento, usuario asignado
- **Comentarios en tareas**
  - Relación **1:N** entre tarea y comentarios
- **Notificaciones simuladas**
  - Registrar log en tabla `notifications` cuando cambia el estado de una tarea
- **Subida de archivos**
  - Adjuntar archivo (PDF o imagen)
  - Guardar en carpeta `/uploads`
  - Registrar ruta en base de datos
  - Endpoint para descargar/ver archivo
- **Base de datos**
  - Tablas: `users`, `tasks`, `comments`, `notifications`
  - Relaciones:
    - `users` 1:N `tasks`
    - `tasks` 1:N `comments`
    - `tasks` 1:N `notifications`

---

### 💻 Frontend Web (React)
- **Pantallas**
  1. Login / Registro
  2. Lista de tareas con filtros por estado y fecha
  3. Formulario para crear/editar tarea con opción de subir archivo
  4. Detalle de tarea con comentarios y archivo adjunto
  5. Panel de administración (solo admin)
- **Características**
  - Guardar JWT en `localStorage`
  - Mostrar notificaciones recientes
  - Manejo de errores y mensajes
  - Descargar/ver archivos adjuntos

---

### 📱 App Móvil (React Native con Expo)
- **Pantallas**
  1. Login / Registro
  2. Lista de tareas asignadas
  3. Detalle de tarea con comentarios y archivo adjunto
  4. Cambiar estado de tarea
- **Características**
  - Guardar JWT en `AsyncStorage`
  - Sincronización con backend
  - Mostrar notificaciones recientes
  - Descargar/ver archivos adjuntos

---

## 4. Requerimientos Técnicos
- **Backend**
  - Node.js + Express
  - PostgreSQL (ORM a elección)
  - JWT
  - Variables de entorno (`.env`)
  - Validaciones con Joi o similar
  - Estructura modular:
    ```bash
    backend/
      └── src/
          ├── routes/
          ├── controllers/
          ├── models/
          ├── middlewares/
          ├── services/
          └── config/
    ```
- **Frontend Web**
  - React (framework a elección)
  - React Router
  - Componentes reutilizables
- **Mobile**
  - React Native con Expo
  - React Navigation

---

## 6. Criterios de Evaluación
1. Organización del código y separación de responsabilidades  
2. Buenas prácticas (nombres claros, manejo de errores, validaciones)  
3. Seguridad básica (JWT, no exponer credenciales)  
4. Implementación de relaciones y lógica de negocio

---

## 7. Entregables
- 📂 Repositorio en GitHub con:
  - `backend/`
  - `frontend/`
  - `mobile/`
- 🗄️ Script SQL o migraciones

---

## 8. Plazo
- ⏳ **Duración: 3 días**

---
