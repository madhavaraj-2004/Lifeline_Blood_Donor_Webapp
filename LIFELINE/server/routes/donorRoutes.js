import express from 'express';
import { registerDonor, searchDonors } from '../controllers/donorController.js';

const router = express.Router();

router.post('/register', registerDonor);
router.get('/search', searchDonors);

export default router;
