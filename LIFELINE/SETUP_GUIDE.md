# LIFELINE - Quick Start Guide

## ✨ What's Included

A complete MERN stack blood donation management application with:

### Backend Features
✅ User authentication (Donor & Admin)
✅ Blood inventory management
✅ Donation tracking
✅ Blood request system
✅ Search functionality
✅ JWT token-based security
✅ MongoDB integration
✅ RESTful API endpoints

### Frontend Features
✅ Responsive React application
✅ Modern UI with Vite bundler
✅ User authentication flows
✅ Dashboard for donors and admins
✅ Blood search interface
✅ Blood request form
✅ Real-time inventory display

## 🚀 Quick Start (5 Minutes)

### Step 1: Backend Setup
```bash
cd LIFELINE/server
npm install
```

Create `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lifeline
JWT_SECRET=lifeline_secret_key_123
NODE_ENV=development
```

Start MongoDB:
```bash
mongod
```

Run server:
```bash
npm start
```

### Step 2: Frontend Setup
```bash
cd LIFELINE/client
npm install
npm run dev
```

Visit: http://localhost:5173

## 📱 Default Test Accounts

### Admin Dashboard
- **Email**: admin@lifeline.com
- **Password**: admin123
- **URL**: http://localhost:5173/admin/login

### Donor Registration
1. Go to http://localhost:5173/donor/register
2. Create new account with your details
3. Access dashboard at http://localhost:5173/donor/dashboard

## 📊 Main Routes

| Route | Purpose |
|-------|---------|
| `/` | Home page |
| `/blood-search` | Find blood donors |
| `/donor/register` | Register as donor |
| `/donor/login` | Donor login |
| `/donor/dashboard` | Donor profile & history |
| `/request-blood` | Post blood request |
| `/admin/login` | Admin portal |
| `/admin/dashboard` | Inventory management |

## 🔧 Key Files to Modify

### Backend
- `server/.env` - Database and server config
- `server/models/` - Database schemas
- `server/controllers/` - Business logic
- `server/routes/` - API endpoints

### Frontend
- `client/src/App.jsx` - Main app structure
- `client/src/pages/` - Page components
- `client/src/styles/` - CSS styling
- `client/.env` - API URL configuration

## 🌟 Features Walkthrough

### 1. Home Page
- Overview of the application
- Quick access to search and login
- Feature highlights

### 2. Blood Search
- Search donors by blood group
- Filter by city
- View donor contact information

### 3. Donor Registration
- Multi-step registration form
- Blood group selection
- Address and phone information
- Automatic login after registration

### 4. Donor Dashboard
- View personal profile
- Donation history
- Blood requests management
- Update profile information

### 5. Blood Request Form
- Post urgent blood requests
- Specify hospital details
- Doctor information
- Urgency level selection

### 6. Admin Dashboard
- View system statistics
- Manage blood inventory
- Monitor donations
- User management
- Blood request tracking

## 🔐 Security Features

✅ JWT authentication
✅ Password hashing with bcrypt
✅ Protected routes with middleware
✅ Secure token storage
✅ Input validation
✅ Error handling

## 📈 Database Structure

### Collections
1. **Users** - Donors, hospitals, admins
2. **BloodInventory** - Stock levels by blood group
3. **BloodRequests** - Emergency requests
4. **Donations** - Donation records

## 🛠️ API Examples

### Search Blood
```bash
GET /api/blood/search?bloodGroup=O+&city=Delhi
```

### Register User
```bash
POST /api/users/register
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "bloodGroup": "O+",
  "city": "Delhi"
}
```

### Create Blood Request
```bash
POST /api/blood/request
{
  "bloodGroup": "O+",
  "unitsNeeded": 5,
  "hospital": "City Hospital",
  "doctorName": "Dr. Smith",
  "urgencyLevel": "high"
}
```

## ⚙️ Configuration

### Server Config (`server/.env`)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for token signing
- `NODE_ENV` - Environment (development/production)

### Client Config (`client/.env`)
- `VITE_API_URL` - Backend API URL

## 🐛 Common Issues & Solutions

### MongoDB Connection Error
```
Solution: Ensure MongoDB is running locally or check MONGODB_URI
```

### CORS Error
```
Solution: Backend CORS is enabled for localhost:3000 and 5173
```

### Token Expired
```
Solution: Login again, tokens expire in 7 days
```

### Port Already in Use
```
Solution: Change PORT in .env or kill the process using that port
```

## 📚 Next Steps

1. **Customize UI**: Modify colors and styles in `/styles` folder
2. **Add Features**: Create new API routes and React pages
3. **Database**: Extend schemas in `/models` folder
4. **Validation**: Add input validation in controllers
5. **Deployment**: Push to Vercel (frontend) and Heroku (backend)

## 📞 Support

For issues, check:
1. README.md for detailed documentation
2. Console errors for debugging
3. Database connection status
4. Environment variables configuration

---

**Happy Coding! 🚀**

Save lives through technology!
