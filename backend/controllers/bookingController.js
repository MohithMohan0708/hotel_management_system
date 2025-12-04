const Booking = require('../models/Booking');
const Room = require('../models/Room');

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut, totalPrice } = req.body;

    // Check if room exists and is available
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (!room.availability) {
      return res.status(400).json({ message: 'Room is not available' });
    }

    // Create booking
    const booking = await Booking.create({
      userId: req.user._id,
      roomId,
      checkIn,
      checkOut,
      totalPrice
    });

    // Update room availability
    room.availability = false;
    await room.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate('roomId', 'roomNumber type price')
      .populate('userId', 'name email');

    res.status(201).json({ 
      message: 'Booking created successfully', 
      booking: populatedBooking 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('roomId', 'roomNumber type price description')
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all bookings (Admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('roomId', 'roomNumber type price')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns the booking or is admin
    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Make room available again
    await Room.findByIdAndUpdate(booking.roomId, { availability: true });

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update booking status (Admin only)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('roomId', 'roomNumber type price')
     .populate('userId', 'name email');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // If booking is completed or cancelled, make room available
    if (status === 'completed' || status === 'cancelled') {
      await Room.findByIdAndUpdate(booking.roomId, { availability: true });
    }

    res.json({ message: 'Booking status updated', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
