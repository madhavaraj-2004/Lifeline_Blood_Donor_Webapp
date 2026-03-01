import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import BloodInventory from './models/BloodInventory.js';
import User from './models/User.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lifeline', {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('Connected to MongoDB');

    // Seed Admin
    const existingAdmin = await Admin.findOne({ email: 'admin@lifeline.com' });
    if (!existingAdmin) {
      const newAdmin = new Admin({
        fullName: 'Admin User',
        email: 'admin@lifeline.com',
        password: 'admin123',
        role: 'superadmin',
        department: 'operations',
        permissions: {
          manageUsers: true,
          manageInventory: true,
          approveDonations: true,
          manageDonations: true,
          viewReports: true,
          manageAdmins: true
        }
      });
      await newAdmin.save();
      console.log('✓ Admin created: admin@lifeline.com / admin123');
    } else {
      console.log('✓ Admin already exists');
    }

    // Seed Blood Inventory
    const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
    for (const bg of bloodGroups) {
      const exists = await BloodInventory.findOne({ bloodGroup: bg });
      if (!exists) {
        await BloodInventory.create({
          bloodGroup: bg,
          unitsAvailable: 0,
          minStockLevel: 5,
          location: 'Main Blood Bank'
        });
      }
    }
    console.log('✓ Blood inventory initialized');

    // Seed Sample Donors
    const sampleDonors = [
      {
        fullName: 'Rajesh Kumar',
        email: 'rajesh@lifeline.com',
        password: 'donor123',
        phone: '9876543210',
        age: 28,
        gender: 'Male',
        bloodGroup: 'O+',
        address: { street: '123 MG Road', city: 'Bangalore', state: 'KA', pincode: '560001' },
        isDonor: true
      },
      {
        fullName: 'Priya Singh',
        email: 'priya@lifeline.com',
        password: 'donor123',
        phone: '9876543211',
        age: 25,
        gender: 'Female',
        bloodGroup: 'A+',
        address: { street: '456 Park Street', city: 'Delhi', state: 'DL', pincode: '110001' },
        isDonor: true
      },
      {
        fullName: 'Amit Patel',
        email: 'amit@lifeline.com',
        password: 'donor123',
        phone: '9876543212',
        age: 35,
        gender: 'Male',
        bloodGroup: 'B+',
        address: { street: '789 Marine Drive', city: 'Mumbai', state: 'MH', pincode: '400001' },
        isDonor: true
      }
    ];

    for (const donor of sampleDonors) {
      const exists = await User.findOne({ email: donor.email });
      if (!exists) {
        await User.create(donor);
      }
    }
    console.log('✓ Sample donors created');

    console.log('\n✓ Database seeding completed successfully!');
    console.log('\nDefault Admin Credentials:');
    console.log('Email: admin@lifeline.com');
    console.log('Password: admin123');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
