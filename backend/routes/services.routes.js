const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
} = require('../controllers/services.controller'); // ✅ FIXED

// Public: read services
router.get('/', getServices);
router.get('/:id', getServiceById);

// Admin only: create, update, delete
router.post('/', authMiddleware, adminMiddleware, createService);
router.put('/:id', authMiddleware, adminMiddleware, updateService);
router.delete('/:id', authMiddleware, adminMiddleware, deleteService);

module.exports = router;