import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-white animate-fade-in">
          <div className="text-8xl mb-6">🏨</div>
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">Welcome to Hotel Paradise</h1>
          <p className="text-2xl mb-8 drop-shadow-md">Experience luxury and comfort like never before</p>
          <div className="space-x-4">
            <Link 
              to="/rooms" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 inline-block transition-all transform hover:scale-105 shadow-lg"
            >
              🔍 View Rooms
            </Link>
            <Link 
              to="/signup" 
              className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 inline-block transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Get Started
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-2 duration-300">
            <div className="text-5xl mb-4">🛏️</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Luxury Rooms</h3>
            <p className="text-gray-600">Experience comfort in our well-designed rooms with modern amenities</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-2 duration-300">
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Easy Booking</h3>
            <p className="text-gray-600">Book your stay in just a few clicks with our simple booking system</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-2 duration-300">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">24/7 Support</h3>
            <p className="text-gray-600">Our team is always ready to assist you with any queries</p>
          </div>
        </div>

        <div className="mt-20 text-center text-white">
          <h2 className="text-4xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6">
              <div className="text-4xl mb-2">⭐</div>
              <p className="font-semibold">Premium Quality</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6">
              <div className="text-4xl mb-2">💰</div>
              <p className="font-semibold">Best Prices</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6">
              <div className="text-4xl mb-2">🔒</div>
              <p className="font-semibold">Secure Booking</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6">
              <div className="text-4xl mb-2">🎯</div>
              <p className="font-semibold">Easy Cancellation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
