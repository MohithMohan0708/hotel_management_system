import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { roomAPI } from '../services/api';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchRooms();
  }, [filter]);

  const fetchRooms = async () => {
    try {
      const response = filter === 'available' 
        ? await roomAPI.getAvailableRooms()
        : await roomAPI.getAllRooms();
      setRooms(response.data.rooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Available Rooms</h1>

        <div className="mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded mr-2 ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          >
            All Rooms
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-4 py-2 rounded ${filter === 'available' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          >
            Available Only
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-2">🏨</div>
                  <p className="text-xl font-bold">Room {room.roomNumber}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{room.type}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${room.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {room.availability ? '✓ Available' : '✗ Booked'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>
                <div className="flex items-baseline mb-4">
                  <p className="text-3xl font-bold text-blue-600">${room.price}</p>
                  <span className="text-gray-500 ml-2">/night</span>
                </div>
                
                {room.amenities && room.amenities.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Amenities:</p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                          +{room.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <Link
                  to={`/rooms/${room._id}`}
                  className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  View Details & Book
                </Link>
              </div>
            </div>
          ))}
        </div>

        {rooms.length === 0 && (
          <p className="text-center text-gray-600 text-xl">No rooms found</p>
        )}
      </div>
    </div>
  );
};

export default RoomsList;
