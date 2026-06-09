# LIFELINE - Blood Donor Web Application

A full-stack MERN application for blood donation management, connecting blood donors with hospitals and individuals in need.

## 🚀 Features

- **Donor Management**: Register as a donor, manage donation history
- **Blood Search**: Find available blood donors by blood group and location
- **Blood Requests**: Post urgent blood requests from hospitals
- **Admin Dashboard**: Complete blood inventory management system
- **Real-time Updates**: Live blood inventory status tracking
- **User Authentication**: Secure JWT-based authentication

## 📁 Project Structure

```
LIFELINE/
├── server/                          # Backend (Express.js)
│   ├── models/
│   │   ├── User.js                 # User schema (donors, hospitals, admins)
│   │   ├── BloodInventory.js       # Blood inventory tracking
│   │   ├── BloodRequest.js         # Blood requests
│   │   └── Donation.js             # Donation records
│   ├── controllers/
│   │   ├── authController.js       # Authentication logic
│   │   ├── donorController.js      # Donor operations
│   │   ├── bloodController.js      # Blood search/inventory
│   │   └── adminController.js      # Admin operations
│   ├── routes/
│   │   ├── auth.js                 # Auth routes
│   │   ├── donor.js                # Donor routes
│   │   ├── blood.js                # Blood routes
│   │   └── admin.js                # Admin routes
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   └── server.js                    # Server entry point
│
└── client/                          # Frontend (React + Vite)
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx            # Landing page
    │   │   ├── DonorRegister.jsx   # Donor registration
    │   │   ├── DonorLogin.jsx      # Donor login
    │   │   ├── DonorDashboard.jsx  # Donor dashboard
    │   │   ├── BloodSearch.jsx     # Blood search
    │   │   ├── RequestBlood.jsx    # Blood request form
    │   │   ├── AdminLogin.jsx      # Admin login
    │   │   └── AdminDashboard.jsx  # Admin dashboard
    │   ├── components/
    │   │   └── Navbar.jsx          # Navigation bar
    │   ├── styles/
    │   │   ├── Home.css
    │   │   ├── Auth.css
    │   │   ├── BloodSearch.css
    │   │   ├── Dashboard.css
    │   │   └── Navbar.css
    │   ├── App.jsx                 # Main app with routing
    │   └── main.jsx                # React entry point
    └── vite.config.js              # Vite configuration
```

## 🔧 Installation & Setup

### Backend Setup

1. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Create `.env` file** in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/lifeline
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

3. **Start MongoDB**:
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

4. **Run the server**:
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

### Frontend Setup

1. **Install dependencies**:
   ```bash
   cd client
   npm install
   ```

2. **Create `.env` file** in the client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 📝 Default Credentials

### Admin Login
- **Email**: admin@lifeline.com
- **Password**: admin123

### Donor Registration
- Create an account on the registration page
- Select your blood group and location
- Start donating or searching for blood

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- **Access Tokens**: Stored in localStorage
- **Token Expiry**: Configured in server (default: 7 days)
- **Automatic Logout**: Users are logged out when token expires

## 📊 Database Collections

### Users
```javascript
{
  fullName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  age: Number,
  bloodGroup: String,
  role: String (donor/hospital/admin),
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  donationCount: Number,
  lastDonationDate: Date,
  canDonate: Boolean,
  createdAt: Date
}
```

### BloodInventory
```javascript
{
  bloodGroup: String,
  unitsAvailable: Number,
  minStockLevel: Number,
  lastUpdated: Date
}
```

### BloodRequests
```javascript
{
  bloodGroup: String,
  unitsNeeded: Number,
  urgencyLevel: String,
  hospital: String,
  doctorName: String,
  doctorPhone: String,
  purpose: String,
  requiredByDate: Date,
  status: String (pending/fulfilled/rejected),
  createdAt: Date
}
```

### Donations
```javascript
{
  donor: ObjectId,
  bloodGroup: String,
  unitsCollected: Number,
  collectionDate: Date,
  status: String,
  createdAt: Date
}
```

## 🌐 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/admin/login` - Admin login

### Donor Operations
- `GET /api/users/profile` - Get donor profile
- `PUT /api/users/profile` - Update profile
- `GET /api/donors` - List all donors

### Blood Management
- `GET /api/blood/search` - Search donors by blood group
- `POST /api/blood/request` - Create blood request
- `GET /api/blood/inventory` - Get current inventory

### Admin Operations
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - List all users
- `GET /api/admin/donations` - List all donations
- `GET /api/admin/requests` - List blood requests

## 🎨 UI Components

### Pages
- **Home**: Landing page with features overview
- **Blood Search**: Find donors by blood group and location
- **Donor Registration/Login**: User authentication
- **Donor Dashboard**: View profile and donation history
- **Blood Request Form**: Post urgent blood requests
- **Admin Dashboard**: Manage inventory and view statistics

### Styling
- Responsive design (mobile-first approach)
- CSS Grid and Flexbox layouts
- Color scheme: Red (#dc3545) for primary actions
- Smooth animations and transitions

## 🚀 Deployment

### Backend (Heroku/Railway/Render)
1. Set environment variables
2. Push code to Git repository
3. Deploy using platform's CLI or dashboard

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the `dist` folder
3. Set API URL environment variable

## 🐛 Troubleshooting

### CORS Issues
- Ensure backend CORS is properly configured
- Check that frontend API URL matches backend address

### Authentication Issues
- Clear localStorage if token is expired
- Ensure JWT_SECRET matches across sessions
- Check token expiry configuration

### Database Connection
- Verify MongoDB is running
- Check MONGODB_URI in .env file
- Ensure database user permissions are correct

## 📚 Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

### Frontend
- React 18
- React Router v6
- Axios
- Vite
- CSS3

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Made with ❤️ for saving lives through blood donation**
