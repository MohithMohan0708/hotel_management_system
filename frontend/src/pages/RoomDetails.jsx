import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { roomAPI, bookingAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    try {
      const response = await roomAPI.getRoomById(id);
      setRoom(response.data.room);
    } catch (error) {
      toast.error('Failed to load room details');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut || !room) return 0;
    const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * room.price : 0;
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.info('Please login to book a room');
      navigate('/login');
      return;
    }

    if (!room.availability) {
      toast.error('This room is not available');
      return;
    }

    try {
      const totalPrice = calculateTotalPrice();
      await bookingAPI.createBooking({
        roomId: room._id,
        checkIn,
        checkOut,
        totalPrice
      });
      toast.success('Booking successful! 🎉');
      setTimeout(() => navigate('/my-bookings'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading room details...</p>
        </div>
      </div>
    );
  }
  
  if (!room) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🚫</div>
        <p className="text-gray-600 text-xl">Room not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold mb-4">Room {room.roomNumber}</h1>
          
          <div className="mb-6">
            <span className={`px-4 py-2 rounded ${room.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {room.availability ? 'Available' : 'Not Available'}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Room Type</h3>
              <p className="text-gray-700">{room.type}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Price</h3>
              <p className="text-3xl font-bold text-blue-600">${room.price}/night</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{room.description}</p>
          </div>

          {room.amenities && room.amenities.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {room.availability && (
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-4">Book This Room</h2>
              
              <form onSubmit={handleBooking}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Check-in Date</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Check-out Date</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>

                {checkIn && checkOut && (
                  <div className="mb-4 p-4 bg-gray-100 rounded">
                    <p className="text-lg">Total Price: <span className="font-bold text-blue-600">${calculateTotalPrice()}</span></p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold"
                >
                  Book Now
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
