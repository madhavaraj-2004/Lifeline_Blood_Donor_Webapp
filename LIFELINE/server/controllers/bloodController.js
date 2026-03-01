import BloodInventory from '../models/BloodInventory.js';
import Donation from '../models/Donation.js';
import BloodRequest from '../models/BloodRequest.js';
import User from '../models/User.js';

// Initialize blood inventory (run once)
export const initializeInventory = async (req, res) => {
  try {
    const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

    for (const bg of bloodGroups) {
      const exists = await BloodInventory.findOne({ bloodGroup: bg });
      if (!exists) {
        await BloodInventory.create({
          bloodGroup: bg,
          unitsAvailable: 0,
          minStockLevel: 5
        });
      }
    }

    res.status(201).json({ message: 'Blood inventory initialized' });
  } catch (error) {
    res.status(500).json({ message: 'Error initializing inventory', error: error.message });
  }
};

// Get blood inventory
export const getInventory = async (req, res) => {
  try {
    const inventory = await BloodInventory.find();
    res.status(200).json({ inventory });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error: error.message });
  }
};

// Get inventory by blood group
export const getInventoryByBloodGroup = async (req, res) => {
  try {
    const { bloodGroup } = req.params;
    const inventory = await BloodInventory.findOne({ bloodGroup });

    if (!inventory) {
      return res.status(404).json({ message: 'Blood group not found' });
    }

    res.status(200).json({ inventory });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error: error.message });
  }
};

// Record donation
export const recordDonation = async (req, res) => {
  try {
    const { bloodGroup, unitsCollected, notes } = req.body;

    // Create donation record
    const donation = new Donation({
      donor: req.user.id,
      bloodGroup,
      unitsCollected,
      collectionDate: new Date(),
      notes,
      status: 'collected'
    });

    await donation.save();

    // Update inventory
    await BloodInventory.findOneAndUpdate(
      { bloodGroup },
      {
        $inc: { unitsAvailable: unitsCollected },
        lastUpdated: new Date()
      }
    );

    // Update user
    await User.findByIdAndUpdate(req.user.id, {
      lastDonationDate: new Date(),
      $inc: { donationCount: 1 }
    });

    res.status(201).json({
      message: 'Donation recorded successfully',
      donation
    });
  } catch (error) {
    res.status(500).json({ message: 'Error recording donation', error: error.message });
  }
};

// Create blood request
export const createBloodRequest = async (req, res) => {
  try {
    const {
      bloodGroup,
      unitsNeeded,
      urgencyLevel,
      hospital,
      hospitalAddress,
      hospitalPhone,
      patientName,
      doctorName,
      doctorPhone,
      purpose,
      requiredByDate,
      additionalNotes
    } = req.body;

    const request = new BloodRequest({
      requester: req.user.id,
      bloodGroup,
      unitsNeeded,
      urgencyLevel,
      hospital,
      hospitalAddress,
      hospitalPhone,
      patientName,
      doctorName,
      doctorPhone,
      purpose,
      requiredByDate,
      additionalNotes
    });

    await request.save();

    // Find matching donors
    const matchingDonors = await User.find({
      bloodGroup,
      isDonor: true,
      canDonate: true,
      'address.city': req.body.city
    });

    res.status(201).json({
      message: 'Blood request created successfully',
      request,
      matchingDonorCount: matchingDonors.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating request', error: error.message });
  }
};

// Get all blood requests
export const getBloodRequests = async (req, res) => {
  try {
    const { status, bloodGroup, city } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (city) filter['hospitalAddress'] = { $regex: city, $options: 'i' };

    const requests = await BloodRequest.find(filter)
      .populate('requester', 'fullName email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: requests.length,
      requests
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error: error.message });
  }
};

// Get blood request by ID
export const getBloodRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await BloodRequest.findById(id)
      .populate('requester', 'fullName email phone')
      .populate('matchedDonors.donor', 'fullName email phone bloodGroup');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ request });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching request', error: error.message });
  }
};

// Search available blood
export const searchBlood = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    if (!bloodGroup) {
      return res.status(400).json({ message: 'Blood group is required' });
    }

    const inventory = await BloodInventory.findOne({ bloodGroup });
    let donors = await User.find({
      bloodGroup,
      isDonor: true,
      canDonate: true
    });

    // Filter by city if provided
    if (city) {
      donors = donors.filter(d => 
        d.address?.city?.toLowerCase() === city.toLowerCase()
      );
    }

    res.status(200).json({
      bloodGroup,
      availableUnits: inventory?.unitsAvailable || 0,
      availableDonors: donors.length,
      donors: donors.map(d => ({
        _id: d._id,
        fullName: d.fullName,
        phone: d.phone,
        age: d.age,
        address: d.address,
        lastDonationDate: d.lastDonationDate
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Error searching blood', error: error.message });
  }
};
