import { body, validationResult } from 'express-validator';

export const validateDonorRegistration = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit phone number required'),
  body('age').isInt({ min: 18, max: 65 }).withMessage('Age must be between 18 and 65'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Valid gender required'),
  body('bloodGroup').isIn(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']).withMessage('Valid blood group required'),
  body('city').trim().notEmpty().withMessage('City is required')
];

export const validateBloodRequest = [
  body('bloodGroup').isIn(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']).withMessage('Valid blood group required'),
  body('unitsNeeded').isInt({ min: 1 }).withMessage('Units must be at least 1'),
  body('hospital').trim().notEmpty().withMessage('Hospital name is required'),
  body('doctorName').trim().notEmpty().withMessage('Doctor name is required'),
  body('doctorPhone').matches(/^[0-9]{10}$/).withMessage('Valid doctor phone required'),
  body('purpose').isIn(['surgery', 'accident', 'anemia', 'childbirth', 'other']).withMessage('Valid purpose required')
];

export const validateDonation = [
  body('bloodGroup').isIn(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']).withMessage('Valid blood group required'),
  body('unitsCollected').isInt({ min: 1, max: 5 }).withMessage('Units must be between 1 and 5')
];

export const validateAdminLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
