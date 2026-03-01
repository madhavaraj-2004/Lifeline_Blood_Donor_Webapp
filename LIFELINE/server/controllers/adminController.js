import Admin from '../models/Admin.js';
import User from '../models/User.js';
import Donation from '../models/Donation.js';
import BloodRequest from '../models/BloodRequest.js';
import BloodInventory from '../models/BloodInventory.js';
import { generateToken } from '../middleware/auth.js';

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(admin._id, 'admin');

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalDonors = await User.countDocuments({ isDonor: true });
    const totalDonations = await Donation.countDocuments({ status: 'collected' });
    const pendingRequests = await BloodRequest.countDocuments({ status: 'pending' });
    const criticalRequests = await BloodRequest.countDocuments({ urgencyLevel: 'critical' });

    const bloodStats = await BloodInventory.find();

    res.status(200).json({
      totalDonors,
      totalDonations,
      pendingRequests,
      criticalRequests,
      bloodInventory: bloodStats,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const { role, search } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter).select('-password').limit(100);

    res.status(200).json({
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Get all donations
export const getAllDonations = async (req, res) => {
  try {
    const { status, bloodGroup } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (bloodGroup) filter.bloodGroup = bloodGroup;

    const donations = await Donation.find(filter)
      .populate('donor', 'fullName email phone bloodGroup')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: donations.length,
      donations
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations', error: error.message });
  }
};

// Approve donation
export const approveDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const { healthCheckup } = req.body;

    const donation = await Donation.findByIdAndUpdate(
      id,
      {
        status: 'approved',
        healthCheckup
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Donation approved',
      donation
    });
  } catch (error) {
    res.status(500).json({ message: 'Error approving donation', error: error.message });
  }
};

// Approve blood request
export const approveBloodRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await BloodRequest.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    );

    res.status(200).json({
      message: 'Request approved',
      request
    });
  } catch (error) {
    res.status(500).json({ message: 'Error approving request', error: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Get admin profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};
