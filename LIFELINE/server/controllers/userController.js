import User from '../models/User.js';
import { generateToken } from '../middleware/auth.js';

// Register user (Donor)
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, phone, age, gender, bloodGroup, city, street, state, pincode } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      password,
      phone,
      age,
      gender,
      bloodGroup,
      address: { street, city, state, pincode },
      isDonor: true,
      role: 'donor'
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id, 'donor');

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        bloodGroup: user.bloodGroup,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and select password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id, 'donor');

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        bloodGroup: user.bloodGroup,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { fullName, phone, age, address, medicalHistory } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, phone, age, address, medicalHistory },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// Get all donors (for blood requests)
export const getDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    const filter = {
      isDonor: true,
      canDonate: true,
      role: 'donor'
    };

    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (city) filter['address.city'] = city;

    const donors = await User.find(filter).select('-password');

    res.status(200).json({
      count: donors.length,
      donors
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donors', error: error.message });
  }
};

// Mark last donation date
export const updateLastDonation = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        lastDonationDate: new Date(),
        donationCount: (await User.findById(req.user.id)).donationCount + 1
      },
      { new: true }
    );

    res.status(200).json({ message: 'Donation recorded', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating donation', error: error.message });
  }
};
