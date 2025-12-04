require('dotenv').config();
const mongoose = require('mongoose');
const Room = require('./models/Room');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const sampleRooms = [
  {
    roomNumber: '101',
    type: 'Single',
    price: 100,
    description: 'Cozy single room with city view, perfect for solo travelers',
    availability: true,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Fridge']
  },
  {
    roomNumber: '102',
    type: 'Single',
    price: 100,
    description: 'Comfortable single room with modern amenities',
    availability: true,
    amenities: ['WiFi', 'TV', 'AC']
  },
  {
    roomNumber: '201',
    type: 'Double',
    price: 150,
    description: 'Spacious double room with queen-size bed and balcony',
    availability: true,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Fridge', 'Balcony']
  },
  {
    roomNumber: '202',
    type: 'Double',
    price: 150,
    description: 'Elegant double room with garden view',
    availability: true,
    amenities: ['WiFi', 'TV', 'AC', 'Coffee Maker']
  },
  {
    roomNumber: '301',
    type: 'Suite',
    price: 250,
    description: 'Luxurious suite with separate living area and premium amenities',
    availability: true,
    amenities: ['WiFi', 'Smart TV', 'AC', 'Mini Bar', 'Jacuzzi', 'Room Service']
  },
  {
    roomNumber: '302',
    type: 'Suite',
    price: 250,
    description: 'Executive suite with panoramic city views',
    availability: true,
    amenities: ['WiFi', 'Smart TV', 'AC', 'Mini Bar', 'Work Desk']
  },
  {
    roomNumber: '401',
    type: 'Deluxe',
    price: 350,
    description: 'Premium deluxe room with king-size bed and luxury furnishings',
    availability: true,
    amenities: ['WiFi', 'Smart TV', 'AC', 'Mini Bar', 'Jacuzzi', 'Room Service', 'Butler Service']
  },
  {
    roomNumber: '402',
    type: 'Deluxe',
    price: 350,
    description: 'Top-floor deluxe room with stunning views and premium services',
    availability: true,
    amenities: ['WiFi', 'Smart TV', 'AC', 'Mini Bar', 'Jacuzzi', 'Balcony', 'Room Service']
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Room.deleteMany({});
    console.log('Cleared existing rooms');

    // Insert sample rooms
    await Room.insertMany(sampleRooms);
    console.log('Sample rooms added successfully');

    // Create admin user if not exists
    const adminExists = await User.findOne({ email: 'admin@hotel.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin User',
        email: 'admin@hotel.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created: admin@hotel.com / admin123');
    }

    // Create test user if not exists
    const userExists = await User.findOne({ email: 'user@test.com' });
    if (!userExists) {
      const hashedPassword = await bcrypt.hash('user123', 10);
      await User.create({
        name: 'Test User',
        email: 'user@test.com',
        password: hashedPassword,
        role: 'user'
      });
      console.log('Test user created: user@test.com / user123');
    }

    console.log('\nDatabase seeded successfully!');
    console.log('\nTest Credentials:');
    console.log('Admin: admin@hotel.com / admin123');
    console.log('User: user@test.com / user123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
