const Room = require('../models/Room');

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json({ rooms });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get available rooms
exports.getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ availability: true }).sort({ createdAt: -1 });
    res.json({ rooms });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json({ room });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add room (Admin only)
exports.addRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, description, amenities } = req.body;

    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(400).json({ message: 'Room number already exists' });
    }

    const room = await Room.create({
      roomNumber,
      type,
      price,
      description,
      amenities: amenities || []
    });

    res.status(201).json({ message: 'Room added successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update room (Admin only)
exports.updateRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, description, availability, amenities } = req.body;

    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { roomNumber, type, price, description, availability, amenities },
      { new: true, runValidators: true }
    );

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json({ message: 'Room updated successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete room (Admin only)
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
