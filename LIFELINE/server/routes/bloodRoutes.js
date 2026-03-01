import express from 'express';
import {
  initializeInventory,
  getInventory,
  getInventoryByBloodGroup,
  recordDonation,
  createBloodRequest,
  getBloodRequests,
  getBloodRequestById,
  searchBlood
} from '../controllers/bloodController.js';
import { authMiddleware } from '../middleware/auth.js';
import { validateDonation, validateBloodRequest, handleValidationErrors } from '../middleware/validators.js';

const router = express.Router();

// Blood inventory routes
router.post('/inventory/initialize', initializeInventory);
router.get('/inventory', getInventory);
router.get('/inventory/:bloodGroup', getInventoryByBloodGroup);

// Donation routes
router.post('/donate', authMiddleware, validateDonation, handleValidationErrors, recordDonation);

// Blood request routes
router.post('/request', validateBloodRequest, handleValidationErrors, createBloodRequest);
router.get('/requests', getBloodRequests);
router.get('/requests/:id', getBloodRequestById);

// Search blood
router.get('/search', searchBlood);

export default router;
