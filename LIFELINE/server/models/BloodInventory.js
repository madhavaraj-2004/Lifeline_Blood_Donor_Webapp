import mongoose from 'mongoose';

const bloodInventorySchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
    enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    required: true,
    unique: true
  },
  unitsAvailable: {
    type: Number,
    default: 0,
    min: 0
  },
  minStockLevel: {
    type: Number,
    default: 5,
    description: 'Alert if stock drops below this level'
  },
  location: {
    type: String,
    default: 'Main Blood Bank'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  history: [{
    date: Date,
    unitsAdded: Number,
    unitsUsed: Number,
    reason: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Update lastUpdated on any change
bloodInventorySchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

export default mongoose.model('BloodInventory', bloodInventorySchema);
