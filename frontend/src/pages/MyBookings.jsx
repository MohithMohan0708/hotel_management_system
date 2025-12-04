import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { bookingAPI } from '../services/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings();
      setBookings(response.data.bookings);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await bookingAPI.cancelBooking(id);
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📅</div>
            <p className="text-gray-600 text-xl mb-4">No bookings found</p>
            <a href="/rooms" className="text-blue-600 hover:underline">Browse available rooms</a>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🏨</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Room {booking.roomId?.roomNumber}</h3>
                      <p className="text-sm text-gray-600">{booking.roomId?.type}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status === 'confirmed' ? '✓ Confirmed' : 
                     booking.status === 'cancelled' ? '✗ Cancelled' : 
                     '✓ Completed'}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="text-xs text-gray-500">Check-in</p>
                      <p className="font-semibold">{new Date(booking.checkIn).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="text-xs text-gray-500">Check-out</p>
                      <p className="font-semibold">{new Date(booking.checkOut).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="text-xs text-gray-500">Total Price</p>
                      <p className="text-xl font-bold text-blue-600">${booking.totalPrice}</p>
                    </div>
                  </div>
                </div>

                {booking.status === 'confirmed' && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
