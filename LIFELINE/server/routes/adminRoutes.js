import express from 'express';
import {
  adminLogin,
  getDashboardStats,
  getAllUsers,
  getAllDonations,
  approveDonation,
  approveBloodRequest,
  deleteUser,
  getAdminProfile
} from '../controllers/adminController.js';
import { adminAuthMiddleware } from '../middleware/auth.js';
import { validateAdminLogin, handleValidationErrors } from '../middleware/validators.js';

const router = express.Router();

// Public routes
router.post('/login', validateAdminLogin, handleValidationErrors, adminLogin);

// Protected routes (admin only)
router.get('/profile', adminAuthMiddleware, getAdminProfile);
router.get('/dashboard', adminAuthMiddleware, getDashboardStats);
router.get('/users', adminAuthMiddleware, getAllUsers);
router.delete('/users/:id', adminAuthMiddleware, deleteUser);

// Donation management
router.get('/donations', adminAuthMiddleware, getAllDonations);
router.put('/donations/:id/approve', adminAuthMiddleware, approveDonation);

// Blood request management
router.put('/requests/:id/approve', adminAuthMiddleware, approveBloodRequest);

export default router;
