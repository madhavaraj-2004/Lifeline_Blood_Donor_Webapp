# LIFELINE - Blood Donor Web Application Installation Guide

## Project Overview
LIFELINE is a complete MERN stack application that connects blood donors with people in need of blood. The application has three main flows:
- **Admin Panel**: Manage donors and view statistics
- **Donor Registration**: Google login + Registration
- **Blood Search**: Find blood donors by group and location

---

## Prerequisites

Before starting, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** - [Create Free Account](https://www.mongodb.com/cloud/atlas)
- **Google OAuth Credentials** - [Create at Google Console](https://console.cloud.google.com/)

---

## Step 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and log in
3. Create a new cluster (choose free tier)
4. Click "Connect" and select "Connect your application"
5. Copy the connection string and replace `<username>`, `<password>`, and `<dbname>` with your credentials
6. The URL should look like:
   ```
   mongodb+srv://username:password@cluster0.mongodb.net/lifeline?retryWrites=true&w=majority
   ```

---

## Step 2: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the "Google+ API"
4. Go to "Credentials" and create an "OAuth 2.0 Client ID"
5. Add authorized JavaScript origins: `http://localhost:3000`
6. Add authorized redirect URIs: `http://localhost:3000`
7. Copy your Client ID

---

## Step 3: Backend Setup

### 3.1 Navigate to Server Directory
```bash
cd LIFELINE/server
```

### 3.2 Install Dependencies
```bash
npm install
```

### 3.3 Create .env File
Create a `.env` file in the `server` folder:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/lifeline?retryWrites=true&w=majority
PORT=5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
```

Replace with your actual MongoDB URI and Google Client ID.

### 3.4 Run Admin Seed (Create Default Admin)
```bash
npm run seed
```

This creates a default admin account:
- **Email**: admin@lifeline.com
- **Password**: admin123

### 3.5 Start Backend Server
```bash
npm start
```

The server should now be running on `http://localhost:5000`

---

## Step 4: Frontend Setup

### 4.1 Navigate to Client Directory
```bash
cd ../client
```

### 4.2 Install Dependencies
```bash
npm install
```

### 4.3 Create .env File
Create a `.env.local` file in the `client` folder:
```
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

Replace with your actual Google Client ID.

### 4.4 Start Frontend Server
```bash
npm run dev
```

The frontend should now be running on `http://localhost:3000`

---

## Step 5: Testing the Application

### Admin Panel
1. Go to Home page → Click "Admin"
2. Login with:
   - **Email**: admin@lifeline.com
   - **Password**: admin123
3. View dashboard stats and manage donors

### Become a Donor
1. Go to Home page → Click "Become a Donor"
2. Click "Sign in with Google"
3. Complete the donor registration form
4. Data will be saved to MongoDB

### Search for Blood
1. Go to Home page → Click "Search for Blood"
2. Select blood group and enter city
3. Click "Search Blood"
4. View matching donors and click "Call" to dial

---

## Project Structure

```
LIFELINE/
├── server/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js # Admin operations
│   │   └── donorController.js # Donor operations
│   ├── models/
│   │   ├── Admin.js           # Admin schema
│   │   └── Donor.js           # Donor schema
│   ├── routes/
│   │   ├── adminRoutes.js     # Admin endpoints
│   │   └── donorRoutes.js     # Donor endpoints
│   ├── server.js              # Main server file
│   ├── seed.js                # Admin seeding script
│   ├── package.json
│   └── .env.example
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx     # Navigation component
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Home page
│   │   │   ├── DonorPanel.jsx # Donor login
│   │   │   ├── DonorRegister.jsx # Donor registration
│   │   │   ├── BloodSearch.jsx # Blood search
│   │   │   ├── AdminLogin.jsx # Admin login
│   │   │   └── AdminDashboard.jsx # Admin dashboard
│   │   ├── App.jsx            # Main app component
│   │   ├── App.css            # App styles
│   │   └── main.jsx           # React entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
└── install_guide.md
```

---

## API Endpoints

### Admin Endpoints
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard-stats` - Get dashboard statistics
- `GET /api/admin/donors` - Get all donors
- `DELETE /api/admin/donors/:id` - Delete a donor

### Donor Endpoints
- `POST /api/donor/register` - Register as donor
- `GET /api/donor/search` - Search donors by blood group and city

---

## Troubleshooting

### MongoDB Connection Error
- Check your MongoDB URI in `.env`
- Ensure MongoDB Atlas IP whitelist includes your current IP
- Verify username and password are URL-encoded

### Google OAuth Not Working
- Double-check your Google Client ID
- Ensure localhost:3000 is added to authorized origins
- Clear browser cache and cookies

### Port Already in Use
- Change `PORT` in `.env` for backend (default: 5000)
- Change `port` in `vite.config.js` for frontend (default: 3000)

### Dependencies Issues
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

---

## Running in Production

For production deployment:

1. Update MongoDB URI to production database
2. Update Google OAuth credentials for production domain
3. Build frontend: `npm run build`
4. Deploy server to your hosting platform (Heroku, Railway, etc.)
5. Deploy frontend to Vercel or Netlify

---

## Features Included

✅ Google OAuth Login for Donors  
✅ Donor Registration with form validation  
✅ Blood Search by group and location  
✅ Admin Dashboard with statistics  
✅ Donor management (view and delete)  
✅ Blood group distribution charts  
✅ Phone dialer integration  
✅ Responsive Bootstrap UI  
✅ MongoDB Atlas auto-creation  
✅ RESTful API architecture  

---

## Support

For issues or questions, refer to:
- MongoDB Documentation: https://docs.mongodb.com/
- Express.js Guide: https://expressjs.com/
- React Documentation: https://react.dev/
- Vite Guide: https://vitejs.dev/

---

## License

This project is open source and available under the MIT License.

---

**Happy coding! 🩸**
