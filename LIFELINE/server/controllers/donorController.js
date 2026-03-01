import Donor from '../models/Donor.js';

export const registerDonor = async (req, res) => {
  const { name, email, address, city, mobileNumber, bloodGroup } = req.body;

  if (!name || !email || !address || !city || !mobileNumber || !bloodGroup) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingDonor = await Donor.findOne({ email });

    if (existingDonor) {
      return res.status(400).json({ message: 'Donor already registered with this email' });
    }

    const newDonor = new Donor({
      name,
      email,
      address,
      city,
      mobileNumber,
      bloodGroup,
      isAvailable: true,
    });

    await newDonor.save();

    return res.status(201).json({
      message: 'Donor registered successfully',
      donor: newDonor,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const searchDonors = async (req, res) => {
  const { bloodGroup, city } = req.query;

  if (!bloodGroup || !city) {
    return res.status(400).json({ message: 'Blood group and city are required' });
  }

  try {
    const donors = await Donor.find({
      bloodGroup,
      city: { $regex: city, $options: 'i' },
      isAvailable: true,
    }).select('name mobileNumber bloodGroup');

    return res.status(200).json(donors);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
