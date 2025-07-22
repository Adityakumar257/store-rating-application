const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Allowed roles
const VALID_ROLES = ['user', 'owner', 'admin'];

// ✅ REGISTER
exports.register = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  try {
    // Check for existing user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Validate role
    const userRole = VALID_ROLES.includes(role) ? role : 'user';

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: userRole,
    });

    const { password: _, ...userData } = newUser.toJSON();

    return res.status(201).json({
      message: 'User registered successfully',
      user: userData,
    });
  } catch (error) {
    console.error('❌ Register Error:', error.message);
    return res.status(500).json({ error: 'Server error during registration' });
  }
};

// ✅ LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { password: _, ...userData } = user.toJSON();

    return res.json({
      message: 'Login successful',
      token,
      user: userData,
    });
  } catch (error) {
    console.error('❌ Login Error:', error.message);
    return res.status(500).json({ error: 'Server error during login' });
  }
};
