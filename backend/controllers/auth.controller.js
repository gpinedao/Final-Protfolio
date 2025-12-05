const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'yourSecretKey';

// ✅ Register user (always assign "user" role)
exports.register = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("HASHED PASSWORD:", hashedPassword);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(400).json({ message: err.message });
  }
};

// ✅ Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("LOGIN BODY:", req.body);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Signout
exports.signout = (req, res) => {
  res.json({ message: 'User signed out successfully' });
};