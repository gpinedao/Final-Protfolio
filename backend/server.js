const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS allow Vercel frontend + localhost
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8080',
    'https://final-protfolio-sigma.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// ✅ Root test route
app.get('/', (req, res) => {
  res.send('Welcome to my Portfolio application!');
});

// ✅ MongoDB connection (use env variable on Render)
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Import routes
const contactRoutes = require('./routes/contact.routes');
const projectRoutes = require('./routes/project.routes');
const educationRoutes = require('./routes/education.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const serviceRoutes = require('./routes/services.routes');

// ✅ Import middleware
const { authMiddleware, adminMiddleware } = require('./middleware/auth');

// ✅ Public routes
app.use('/api/auth', authRoutes);

// ✅ Protected routes
app.use('/api/contacts', authMiddleware, contactRoutes);
app.use('/api/projects', authMiddleware, projectRoutes);
app.use('/api/educations', authMiddleware, educationRoutes);

// ✅ Services: public to view, admin to modify
app.use('/api/services', serviceRoutes);

// ✅ Admin-only routes
app.use('/api/users', authMiddleware, adminMiddleware, userRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});