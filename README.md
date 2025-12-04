# 🏨 Hotel Management System

A complete, modern Hotel Management System built with React, Node.js, Express, and MongoDB.

## 🚀 Current Status

✅ **Frontend**: Running on http://localhost:3000  
✅ **Backend**: Running on http://localhost:5000  
✅ **Database**: Connected and seeded with sample data

## ✨ New Features Added

### 🔐 Enhanced Authentication
- ✅ Password visibility toggle on login/signup
- ✅ Confirm password validation
- ✅ Loading states during authentication
- ✅ Password strength requirements (min 6 characters)

### 👤 User Profile Management
- ✅ View and edit profile information
- ✅ Change password functionality
- ✅ Profile dropdown menu in navbar
- ✅ User avatar with initials

### 🎨 UI/UX Improvements
- ✅ Beautiful gradient homepage with animations
- ✅ Enhanced room cards with hover effects
- ✅ Loading spinners for better UX
- ✅ Improved booking cards with icons
- ✅ Smooth transitions and animations
- ✅ Better color schemes and shadows
- ✅ Responsive design improvements
- ✅ Empty state messages with icons

### 🔔 Toast Notifications (NEW!)
- ✅ Beautiful toast messages using react-toastify
- ✅ Success notifications (green) for successful actions
- ✅ Error notifications (red) for failures
- ✅ Info notifications (blue) for informational messages
- ✅ Auto-dismiss after 3 seconds
- ✅ Notifications on:
  - Login/Signup success
  - Profile updates
  - Password changes
  - Room bookings
  - Booking cancellations
  - Admin actions (add/edit/delete rooms)
  - Booking status updates
  - Logout

## 🎯 Features

### User Features
- Sign up and login with JWT authentication
- Browse available rooms with filters
- View detailed room information
- Book rooms with date selection
- View and manage bookings
- Update profile information
- Change password
- Cancel bookings

### Admin Features
- Admin dashboard
- Add, edit, and delete rooms
- Manage all bookings
- Update booking status
- View all users

## 🔑 Test Credentials

**Admin Account:**
- Email: `admin@hotel.com`
- Password: `admin123`

**User Account:**
- Email: `user@test.com`
- Password: `user123`

## 🌐 Access URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Features

### User Features
- User authentication (signup/login/logout)
- Browse available rooms
- View room details
- Book rooms with date selection
- View and manage bookings
- Cancel bookings

### Admin Features
- Admin dashboard
- Add, edit, and delete rooms
- Manage all bookings
- Update booking status
- View all users and bookings

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing

## Project Structure

```
hotel-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── roomController.js
│   │   └── bookingController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Room.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── roomRoutes.js
│   │   └── bookingRoutes.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── hooks/
    │   │   └── useAuth.js
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── RoomsList.jsx
    │   │   ├── RoomDetails.jsx
    │   │   ├── MyBookings.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
copy .env.example .env
```

4. Update `.env` with your MongoDB Atlas URI and JWT secret:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

5. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:3000

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user (protected)

### Rooms
- GET `/api/rooms` - Get all rooms
- GET `/api/rooms/available` - Get available rooms
- GET `/api/rooms/:id` - Get room by ID
- POST `/api/rooms` - Add new room (admin only)
- PUT `/api/rooms/:id` - Update room (admin only)
- DELETE `/api/rooms/:id` - Delete room (admin only)

### Bookings
- POST `/api/bookings` - Create booking (protected)
- GET `/api/bookings/my-bookings` - Get user bookings (protected)
- GET `/api/bookings/all` - Get all bookings (admin only)
- PUT `/api/bookings/:id/cancel` - Cancel booking (protected)
- PUT `/api/bookings/:id/status` - Update booking status (admin only)

## Creating Admin User

To create an admin user, you can either:

1. Sign up normally and manually update the user role in MongoDB:
   - Find the user in the `users` collection
   - Change `role` field from `user` to `admin`

2. Or modify the signup API call to include role:
```javascript
{
  "name": "Admin User",
  "email": "admin@hotel.com",
  "password": "admin123",
  "role": "admin"
}
```

## Sample Room Data

You can add sample rooms through the admin dashboard or directly via API:

```javascript
{
  "roomNumber": "101",
  "type": "Single",
  "price": 100,
  "description": "Cozy single room with city view",
  "amenities": ["WiFi", "TV", "AC"]
}
```

Room types: Single, Double, Suite, Deluxe

## Default Credentials for Testing

After setting up, create these test accounts:

**Regular User:**
- Email: user@test.com
- Password: user123

**Admin User:**
- Email: admin@test.com
- Password: admin123
- Role: admin (set manually in database)

## Features Walkthrough

1. **Home Page**: Landing page with hotel information
2. **Signup/Login**: User authentication
3. **Rooms List**: Browse all available rooms with filters
4. **Room Details**: View detailed room information and book
5. **My Bookings**: View and manage your bookings
6. **Admin Dashboard**: 
   - Manage rooms (add, edit, delete)
   - View all bookings
   - Update booking status

## Notes

- JWT tokens are stored in localStorage
- Room availability is automatically updated when booking is created or cancelled
- Admin can manage all rooms and bookings
- Users can only cancel their own bookings
- Booking price is calculated based on number of nights

## Troubleshooting

1. **MongoDB Connection Error**: Ensure your MongoDB Atlas URI is correct and IP whitelist is configured
2. **CORS Error**: Backend CORS is enabled for all origins in development
3. **Port Already in Use**: Change PORT in .env file or kill the process using the port

## Future Enhancements

- Image upload for rooms
- Payment integration
- Email notifications
- Room search and filters
- Reviews and ratings
- Multi-language support

## License

MIT
