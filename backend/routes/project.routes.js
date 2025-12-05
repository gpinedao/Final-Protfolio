const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controllers/project.controller');

// Debug check (safe now)
console.log('authMiddleware type:', typeof authMiddleware);
console.log('createProject type:', typeof createProject);

// Routes
router.post('/', authMiddleware, createProject);
router.get('/', authMiddleware, getProjects);
router.get('/:id', authMiddleware, getProjectById);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;