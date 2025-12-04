const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
  updateBookingStatus
} = require('../controllers/bookingController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/', verifyToken, createBooking);
router.get('/my-bookings', verifyToken, getUserBookings);
router.get('/all', verifyToken, isAdmin, getAllBookings);
router.put('/:id/cancel', verifyToken, cancelBooking);
router.put('/:id/status', verifyToken, isAdmin, updateBookingStatus);

module.exports = router;
