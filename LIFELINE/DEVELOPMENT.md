# LIFELINE Development Guide

## 🎯 Development Workflow

### Starting Development Environment

**Terminal 1 - Backend**
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

**Terminal 3 - MongoDB** (if running locally)
```bash
mongod
# MongoDB runs on mongodb://localhost:27017
```

## 📝 Code Structure Guidelines

### Backend Structure

#### Models (`server/models/`)
- Define database schemas using Mongoose
- Include validation rules
- Add timestamps automatically

Example:
```javascript
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // ... fields
}, { timestamps: true });
```

#### Controllers (`server/controllers/`)
- Handle business logic
- Process requests and responses
- Include error handling
- Use async/await patterns

Example:
```javascript
exports.createUser = async (req, res) => {
  try {
    // Logic here
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

#### Routes (`server/routes/`)
- Define API endpoints
- Use proper HTTP methods
- Apply middleware for authentication
- Keep endpoints RESTful

Example:
```javascript
router.post('/register', validate, authController.register);
router.get('/profile', auth, userController.getProfile);
```

#### Middleware (`server/middleware/`)
- Authentication & authorization
- Input validation
- Error handling
- CORS configuration

### Frontend Structure

#### Pages (`client/src/pages/`)
- Full page components
- Handle routing
- Manage page-level state
- Include forms and complex logic

#### Components (`client/src/components/`)
- Reusable UI components
- Accept props for customization
- Keep components small and focused
- Handle component-level state

#### Styles (`client/src/styles/`)
- CSS files for pages/components
- Use consistent naming conventions
- Implement responsive design
- Mobile-first approach

## 🔄 Adding New Features

### Adding a New Donor Feature

#### Step 1: Create Backend API

1. **Update Model** (`server/models/User.js`):
```javascript
// Add new field if needed
donationFrequency: { type: String, enum: ['regular', 'occasional'] }
```

2. **Create Controller** (`server/controllers/donorController.js`):
```javascript
exports.updateDonationFrequency = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { donationFrequency: req.body.frequency },
      { new: true }
    );
    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
```

3. **Add Route** (`server/routes/donor.js`):
```javascript
router.put('/frequency', auth, donorController.updateDonationFrequency);
```

#### Step 2: Create Frontend UI

1. **Create Component** (`client/src/pages/UpdateFrequency.jsx`):
```javascript
import axios from 'axios';

export default function UpdateFrequency({ token }) {
  const [frequency, setFrequency] = useState('regular');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${API_URL}/donor/frequency`,
        { frequency },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Handle success
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    // JSX here
  );
}
```

2. **Add Route** in `App.jsx`:
```javascript
<Route 
  path="/update-frequency" 
  element={<UpdateFrequency token={donorToken} />} 
/>
```

3. **Update Navbar** if needed in `Navbar.jsx`

## 🧪 Testing API Endpoints

### Using cURL
```bash
# Register user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John","email":"john@example.com","password":"123456","phone":"9876543210","bloodGroup":"O+"}'

# Search blood
curl http://localhost:5000/api/blood/search?bloodGroup=O+

# Admin login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lifeline.com","password":"admin123"}'
```

### Using Postman
1. Import endpoints from API documentation
2. Set environment variables for API_URL and token
3. Test each endpoint with sample data

## 🎨 Styling Guidelines

### CSS Naming Conventions
- Use kebab-case for class names: `.donor-card`
- Use BEM methodology: `.card`, `.card__header`, `.card--active`
- Group related styles together

### Responsive Design
```css
/* Mobile first */
.container {
  padding: 20px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 30px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 40px;
  }
}
```

### Color Scheme
- Primary: `#dc3545` (Red)
- Secondary: `#6c757d` (Gray)
- Success: `#28a745` (Green)
- Warning: `#ffc107` (Yellow)
- Danger: `#dc3545` (Red)
- Info: `#17a2b8` (Blue)

## 🔍 Debugging

### Backend Debugging
```javascript
// Add console logs
console.log('[DEBUG] User ID:', userId);
console.log('[DEBUG] Request body:', req.body);

// Use try-catch with detailed errors
try {
  // operation
} catch (error) {
  console.error('[ERROR] Operation failed:', error.message);
  res.status(500).json({ message: error.message });
}
```

### Frontend Debugging
```javascript
// Use browser console
console.log('[v0] Component state:', state);
console.log('[v0] API response:', response.data);

// Use React DevTools browser extension
// Debug network requests in Network tab
```

## 📦 Adding Dependencies

### Backend
```bash
cd server
npm install package-name

# Save to package.json
npm install --save package-name
```

### Frontend
```bash
cd client
npm install package-name
```

## 🚀 Building for Production

### Backend
```bash
# No build needed, run with npm start
npm start
```

### Frontend
```bash
cd client
npm run build
# Creates dist folder for deployment
```

## 📋 Code Review Checklist

Before committing code:

- [ ] Code follows naming conventions
- [ ] Functions have clear purposes
- [ ] Error handling is implemented
- [ ] No console.log left in production code
- [ ] CSS is properly organized
- [ ] Responsive design tested
- [ ] No unused imports
- [ ] Comments added for complex logic
- [ ] API calls include error handling
- [ ] Security best practices followed

## 🔒 Security Best Practices

### Backend
- ✅ Hash passwords with bcrypt
- ✅ Validate all inputs
- ✅ Use environment variables for secrets
- ✅ Implement CORS properly
- ✅ Use HTTPS in production
- ✅ Sanitize database queries
- ✅ Rate limiting for API endpoints

### Frontend
- ✅ Don't store sensitive data in localStorage
- ✅ Validate user input
- ✅ Use HTTPS for API calls
- ✅ Implement proper error handling
- ✅ Clear tokens on logout
- ✅ Use parameterized queries

## 📊 Performance Optimization

### Backend
- Use database indexes on frequently queried fields
- Implement pagination for large result sets
- Cache frequently accessed data
- Optimize database queries

### Frontend
- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize images
- Minimize bundle size

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/donor-frequency

# Make changes
# Test thoroughly

# Commit with clear message
git commit -m "feat: add donation frequency selection"

# Push to repository
git push origin feature/donor-frequency

# Create Pull Request for review
```

## 🆘 Troubleshooting

### Backend Issues
- Check MongoDB connection
- Verify .env variables
- Review server logs
- Test API endpoints with cURL

### Frontend Issues
- Check browser console for errors
- Verify API URL in .env
- Clear localStorage and reload
- Test with different browsers

### Database Issues
- Verify MongoDB is running
- Check user permissions
- Review schema definitions
- Use MongoDB Compass to inspect data

---

**Happy Development! 🎉**

For more help, refer to README.md and SETUP_GUIDE.md
