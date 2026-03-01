import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'moderator', 'superadmin'],
    default: 'admin'
  },
  permissions: {
    manageUsers: { type: Boolean, default: false },
    manageInventory: { type: Boolean, default: false },
    approveDonations: { type: Boolean, default: false },
    manageDonations: { type: Boolean, default: false },
    viewReports: { type: Boolean, default: false },
    manageAdmins: { type: Boolean, default: false }
  },
  department: {
    type: String,
    enum: ['operations', 'medical', 'logistics', 'it'],
    required: true
  },
  phone: String,
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
adminSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('Admin', adminSchema);
