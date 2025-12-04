import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { roomAPI, bookingAPI } from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('rooms');
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: '',
    type: 'Single',
    price: '',
    description: '',
    availability: true,
    amenities: ''
  });

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await roomAPI.getAllRooms();
      setRooms(response.data.rooms);
    } catch (error) {
      toast.error('Failed to fetch rooms');
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getAllBookings();
      setBookings(response.data.bookings);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const roomData = {
        ...formData,
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a)
      };

      if (editingRoom) {
        await roomAPI.updateRoom(editingRoom._id, roomData);
        toast.success('Room updated successfully! ✅');
      } else {
        await roomAPI.addRoom(roomData);
        toast.success('Room added successfully! 🎉');
      }

      setShowModal(false);
      setEditingRoom(null);
      setFormData({
        roomNumber: '',
        type: 'Single',
        price: '',
        description: '',
        availability: true,
        amenities: ''
      });
      fetchRooms();
    } catch (error) {
      toast.error('Failed to save room');
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      roomNumber: room.roomNumber,
      type: room.type,
      price: room.price,
      description: room.description,
      availability: room.availability,
      amenities: room.amenities?.join(', ') || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    try {
      await roomAPI.deleteRoom(id);
      toast.success('Room deleted successfully');
      fetchRooms();
    } catch (error) {
      toast.error('Failed to delete room');
    }
  };

  const handleBookingStatusUpdate = async (id, status) => {
    try {
      await bookingAPI.updateBookingStatus(id, status);
      toast.success(`Booking ${status} successfully`);
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update booking status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="mb-6">
          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-6 py-2 rounded mr-2 ${activeTab === 'rooms' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          >
            Manage Rooms
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-2 rounded ${activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          >
            Manage Bookings
          </button>
        </div>

        {activeTab === 'rooms' && (
          <div>
            <button
              onClick={() => {
                setEditingRoom(null);
                setFormData({
                  roomNumber: '',
                  type: 'Single',
                  price: '',
                  description: '',
                  availability: true,
                  amenities: ''
                });
                setShowModal(true);
              }}
              className="bg-green-500 text-white px-6 py-2 rounded mb-4 hover:bg-green-600"
            >
              Add New Room
            </button>

            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">Room Number</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Availability</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room._id} className="border-b">
                      <td className="px-4 py-3">{room.roomNumber}</td>
                      <td className="px-4 py-3">{room.type}</td>
                      <td className="px-4 py-3">${room.price}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-sm ${room.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {room.availability ? 'Available' : 'Booked'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleEdit(room)}
                          className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(room._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Room</th>
                  <th className="px-4 py-3 text-left">Check-in</th>
                  <th className="px-4 py-3 text-left">Check-out</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b">
                    <td className="px-4 py-3">{booking.userId?.name}</td>
                    <td className="px-4 py-3">Room {booking.roomId?.roomNumber}</td>
                    <td className="px-4 py-3">{new Date(booking.checkIn).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{new Date(booking.checkOut).toLocaleDateString()}</td>
                    <td className="px-4 py-3">${booking.totalPrice}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-sm ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {booking.status === 'confirmed' && (
                        <>
                          <button
                            onClick={() => handleBookingStatusUpdate(booking._id, 'completed')}
                            className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600 text-sm"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => handleBookingStatusUpdate(booking._id, 'cancelled')}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">
                {editingRoom ? 'Edit Room' : 'Add New Room'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Room Number</label>
                  <input
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Suite">Suite</option>
                    <option value="Deluxe">Deluxe</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows="3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Amenities (comma-separated)</label>
                  <input
                    type="text"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleInputChange}
                    placeholder="WiFi, TV, AC"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="availability"
                      checked={formData.availability}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Available</span>
                  </label>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {editingRoom ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
