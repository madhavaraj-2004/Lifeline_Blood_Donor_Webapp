import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getDonors,
  updateLastDonation
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';
import { validateDonorRegistration, validateAdminLogin, handleValidationErrors } from '../middleware/validators.js';

const router = express.Router();

// Public routes
router.post('/register', validateDonorRegistration, handleValidationErrors, registerUser);
router.post('/login', validateAdminLogin, handleValidationErrors, loginUser);

// Protected routes
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.get('/donors', getDonors);
router.post('/donate', authMiddleware, updateLastDonation);

export default router;
