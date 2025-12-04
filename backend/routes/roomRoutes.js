const express = require('express');
const router = express.Router();
const {
  getAllRooms,
  getAvailableRooms,
  getRoomById,
  addRoom,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', getAllRooms);
router.get('/available', getAvailableRooms);
router.get('/:id', getRoomById);
router.post('/', verifyToken, isAdmin, addRoom);
router.put('/:id', verifyToken, isAdmin, updateRoom);
router.delete('/:id', verifyToken, isAdmin, deleteRoom);

module.exports = router;
