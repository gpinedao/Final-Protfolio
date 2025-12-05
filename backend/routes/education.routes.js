const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const {
  createEducation,
  getEducations,
  getEducationById,
  updateEducation,
  deleteEducation
} = require('../controllers/education.controller');

// Create new education entry (admin only)
router.post('/', authMiddleware, adminMiddleware, createEducation);

// Get all education entries
router.get('/', authMiddleware, getEducations);

// Get single education entry by ID
router.get('/:id', authMiddleware, getEducationById);

// Update education entry by ID (admin only)
router.put('/:id', authMiddleware, adminMiddleware, updateEducation);

// Delete education entry by ID (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, deleteEducation);

module.exports = router;