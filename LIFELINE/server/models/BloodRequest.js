import mongoose from 'mongoose';

const bloodRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodGroup: {
    type: String,
    enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    required: [true, 'Blood group is required']
  },
  unitsNeeded: {
    type: Number,
    required: [true, 'Number of units is required'],
    min: 1
  },
  urgencyLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  hospital: {
    type: String,
    required: [true, 'Hospital name is required']
  },
  hospitalAddress: String,
  hospitalPhone: String,
  patientName: String,
  patientAge: Number,
  doctorName: String,
  doctorPhone: String,
  purpose: {
    type: String,
    enum: ['surgery', 'accident', 'anemia', 'childbirth', 'other'],
    required: true
  },
  additionalNotes: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'in-progress', 'fulfilled', 'cancelled'],
    default: 'pending'
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  requiredByDate: {
    type: Date,
    required: true
  },
  matchedDonors: [{
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['notified', 'accepted', 'rejected', 'donated'],
      default: 'notified'
    },
    respondedAt: Date
  }],
  fulfilledBy: {
    units: Number,
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donation'
    },
    date: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('BloodRequest', bloodRequestSchema);
