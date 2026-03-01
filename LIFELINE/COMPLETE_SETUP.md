# LIFELINE Blood Donor Web Application - Complete Setup Guide

## Project Overview
LIFELINE is a production-ready MERN (MongoDB, Express, React, Node.js) blood donation management system designed for real-world use. It features donor registration, blood inventory management, blood request matching, and an admin dashboard for medical professionals.

## System Architecture

### Backend (Node.js + Express + MongoDB)
- **Port**: 5000
- **Authentication**: JWT-based token authentication
- **Database**: MongoDB Atlas (cloud) or local MongoDB
- **Models**:
  - User (Donors/Recipients)
  - Admin (Staff with role-based permissions)
  - BloodInventory (Blood stock management)
  - Donation (Donation records)
  - BloodRequest (Blood request tracking)

### Frontend (React + Vite)
- **Port**: 5173 (default Vite)
- **Routing**: React Router v6
- **State Management**: Local state + localStorage
- **API Communication**: Axios
- **Styling**: Modern CSS with responsive design

## Prerequisites

Before starting, ensure you have:
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB Atlas account (free tier available at mongodb.com)
- Git (optional)

## Installation Steps

### Step 1: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/lifeline`
4. Keep this string safe - you'll need it for the backend

### Step 2: Setup Backend

```bash
# Navigate to server directory
cd LIFELINE/server

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI
# Example:
# MONGODB_URI=mongodb+srv://youruser:yourpass@cluster.mongodb.net/lifeline
# JWT_SECRET=your_long_random_secret_key_here
# PORT=5000
```

```bash
# Install dependencies
npm install

# Seed database with admin and sample data
npm run seed

# Start the server
npm run dev
```

**Server should be running on**: http://localhost:5000

### Step 3: Setup Frontend

```bash
# Navigate to client directory
cd LIFELINE/client

# Create .env file
cp .env.example .env

# Edit .env
# VITE_API_URL=http://localhost:5000/api
```

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

**Frontend should be running on**: http://localhost:5173

### Step 4: Initialize Blood Inventory

After starting the backend, initialize blood inventory:

```bash
# Call this endpoint once to set up blood groups
curl -X POST http://localhost:5000/api/blood/inventory/initialize
```

## Default Credentials

After seeding, use these to login:

**Admin Dashboard:**
- Email: `admin@lifeline.com`
- Password: `admin123`

**Sample Donors** (already created):
- Email: `rajesh@lifeline.com` | Password: `donor123`
- Email: `priya@lifeline.com` | Password: `donor123`
- Email: `amit@lifeline.com` | Password: `donor123`

## Key Features

### For Donors
- **Registration**: Create account with health information
- **Profile Management**: Update personal and medical history
- **Donation Records**: Track donation history and eligibility
- **Blood Search**: Find blood donors by group and location
- **Blood Requests**: Create and manage blood requests
- **Donor Directory**: Search and contact nearby donors

### For Recipients/Requesters
- **Blood Search**: Search by blood group and location
- **Request Blood**: Submit urgent blood requests
- **Request Tracking**: Monitor request status
- **Donor Matching**: Automatic matching with eligible donors

### For Admins
- **Dashboard**: Real-time statistics and analytics
- **Inventory Management**: Monitor blood stock levels
- **Donation Management**: Approve and manage donations
- **User Management**: View and manage all users
- **Request Approval**: Approve and fulfill blood requests
- **Reports**: Generate and view reports

## API Endpoints

### User Routes (`/api/users`)
- `POST /register` - Register new donor
- `POST /login` - Donor login
- `GET /profile` - Get user profile (protected)
- `PUT /profile` - Update profile (protected)
- `GET /donors` - Search donors by blood group/city
- `POST /donate` - Record donation (protected)

### Blood Routes (`/api/blood`)
- `POST /inventory/initialize` - Initialize blood inventory
- `GET /inventory` - Get all inventory
- `GET /inventory/:bloodGroup` - Get specific blood group
- `POST /donate` - Record donation (protected)
- `POST /request` - Create blood request (protected)
- `GET /requests` - Get all requests
- `GET /requests/:id` - Get specific request
- `GET /search` - Search available blood

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `GET /dashboard` - Get dashboard stats (protected)
- `GET /profile` - Get admin profile (protected)
- `GET /users` - Get all users (protected)
- `DELETE /users/:id` - Delete user (protected)
- `GET /donations` - Get all donations (protected)
- `PUT /donations/:id/approve` - Approve donation (protected)
- `PUT /requests/:id/approve` - Approve blood request (protected)

## Project Structure

```
LIFELINE/
├── server/                      # Backend
│   ├── models/                 # MongoDB schemas
│   │   ├── User.js
│   │   ├── Admin.js
│   │   ├── Donation.js
│   │   ├── BloodInventory.js
│   │   └── BloodRequest.js
│   ├── controllers/            # Business logic
│   │   ├── userController.js
│   │   ├── bloodController.js
│   │   └── adminController.js
│   ├── routes/                 # API routes
│   │   ├── userRoutes.js
│   │   ├── bloodRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/             # Auth & validation
│   │   ├── auth.js
│   │   └── validators.js
│   ├── config/                 # Configuration
│   │   └── db.js
│   ├── server.js              # Main entry
│   ├── seed.js                # Database seeding
│   ├── package.json
│   └── .env.example
│
├── client/                      # Frontend
│   ├── src/
│   │   ├── pages/             # Page components
│   │   ├── components/        # Reusable components
│   │   ├── styles/            # CSS files
│   │   ├── services/          # API services
│   │   ├── App.jsx            # Main app
│   │   └── main.jsx           # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
└── COMPLETE_SETUP.md          # This file
```

## Troubleshooting

### "Cannot connect to MongoDB"
- Check MongoDB Atlas connection string in .env
- Ensure IP whitelist includes your machine (0.0.0.0/0 for development)
- Verify cluster is running

### "CORS errors" in frontend
- Check that API_URL in frontend .env matches backend URL
- Backend should have CORS enabled (it does by default)

### "Token expired" error
- Clear browser localStorage
- Log out and log in again
- JWT tokens expire after 7 days by default

### Port already in use
- Backend: Change PORT in .env (default 5000)
- Frontend: Vite will use next available port automatically

## Environment Variables Reference

**Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/lifeline
JWT_SECRET=your_secret_key_minimum_32_characters_long
JWT_EXPIRE=7d
NODE_ENV=development
ADMIN_EMAIL=admin@lifeline.com
ADMIN_PASSWORD=admin123
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:5000/api
```

## Running in Production

### Backend Deployment (Heroku/Railway/Render)
```bash
# Install production dependencies only
npm ci --production

# Start with production server
NODE_ENV=production npm start
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build for production
npm run build

# Output will be in dist/ folder
```

## Security Considerations

1. **Passwords**: All passwords are hashed with bcryptjs
2. **JWT**: Tokens are HTTP-only secure
3. **Validation**: All inputs are validated server-side
4. **CORS**: Configured to accept only specified origins
5. **Database**: Use MongoDB Atlas IP whitelist in production
6. **Environment Variables**: Never commit .env files

## Testing the Application

### Create a Test Donation
1. Login as donor
2. Go to Dashboard
3. Click "Record Donation"
4. Fill in blood type and units

### Create a Test Blood Request
1. Login as donor/recipient
2. Click "Request Blood"
3. Fill in required blood group and units needed

### Approve as Admin
1. Login to admin dashboard
2. View pending donations/requests
3. Approve or manage as needed

## Performance Tips

- **Database Indexing**: Ensure indexes on frequently queried fields
- **Pagination**: Implement pagination for large datasets
- **Caching**: Use Redis for session caching (optional)
- **CDN**: Deploy frontend to CDN for faster delivery

## Support & Troubleshooting

For issues:
1. Check console logs (frontend & backend)
2. Verify all environment variables are set correctly
3. Ensure MongoDB connection is active
4. Check network tab for API response errors
5. Review API endpoint responses with Postman/Insomnia

## Future Enhancements

- [ ] Email notifications for blood requests
- [ ] SMS alerts for urgent requests
- [ ] Payment integration for plasma collection
- [ ] Real-time notifications using WebSockets
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and reporting
- [ ] Hospital integration API
- [ ] Blood compatibility matrix automation

## License

This project is designed for educational and production use in blood donation management.

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Status**: Production Ready
