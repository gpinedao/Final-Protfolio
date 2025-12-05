const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true
}));
app.use(express.json());

// Simple route to test
app.get('/', (req, res) => {
  res.send('Welcome to my Portfolio application!');
});

// MongoDB connection
const MONGO_URI = 'mongodb+srv://gpinedao:Assignment2@comp229-402.d1klooi.mongodb.net/Portfolio?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const contactRoutes = require('./routes/contact.routes');
const projectRoutes = require('./routes/project.routes');
const educationRoutes = require('./routes/education.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const serviceRoutes = require('./routes/services.routes'); // ✅ FIXED

// Import middleware
const { authMiddleware, adminMiddleware } = require('./middleware/auth');

// Routes
// Public routes
app.use('/api/auth', authRoutes);

// Protected routes (require login)
app.use('/api/contacts', authMiddleware, contactRoutes);
app.use('/api/projects', authMiddleware, projectRoutes);
app.use('/api/educations', authMiddleware, educationRoutes);

// ✅ Services are PUBLIC to view, ADMIN to modify
app.use('/api/services', serviceRoutes);

// Admin‑only routes
app.use('/api/users', authMiddleware, adminMiddleware, userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});