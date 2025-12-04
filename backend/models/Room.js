const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Single', 'Double', 'Suite', 'Deluxe']
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  amenities: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Room', roomSchema);
