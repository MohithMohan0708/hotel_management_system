import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully. See you soon! 👋');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            Hotel Management
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/rooms" className="hover:text-blue-200 transition-colors">Rooms</Link>
            
            {user ? (
              <>
                <Link to="/my-bookings" className="hover:text-blue-200 transition-colors">My Bookings</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-blue-200 transition-colors">Admin Dashboard</Link>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
                    <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="text-sm">{user.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-50">
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-blue-50 transition-colors">
                      My Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition-colors">Login</Link>
                <Link to="/signup" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
