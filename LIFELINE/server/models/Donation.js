import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodGroup: {
    type: String,
    enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    required: true
  },
  unitsCollected: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  },
  collectionDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'collected', 'tested', 'stored'],
    default: 'pending'
  },
  healthCheckup: {
    hemoglobin: Number,
    bloodPressure: String,
    temperature: Number,
    pulse: Number,
    notes: String
  },
  testResults: {
    hiv: { type: String, enum: ['positive', 'negative', 'pending'], default: 'pending' },
    hepatitisB: { type: String, enum: ['positive', 'negative', 'pending'], default: 'pending' },
    hepatitisC: { type: String, enum: ['positive', 'negative', 'pending'], default: 'pending' },
    syphilis: { type: String, enum: ['positive', 'negative', 'pending'], default: 'pending' },
    testDate: Date,
    testedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  usedBy: {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  usageDate: Date,
  hospital: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Donation', donationSchema);
