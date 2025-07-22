// 📁 backend/app.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ DB Connection + Table Sync
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Database connected successfully.');

    await sequelize.sync({ alter: true }); // 🔄 Automatically create/update tables
    console.log('✅ All models were synchronized successfully.');
  } catch (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
    process.exit(1);
  }
})();

// ✅ Import Routes
let authRoutes, userRoutes;
try {
  authRoutes = require('./routes/authRoutes');
  console.log('✅ Loaded authRoutes');
} catch (err) {
  console.error('❌ Error loading authRoutes:', err.message);
}

try {
  userRoutes = require('./routes/userRoutes');
  console.log('✅ Loaded userRoutes');
} catch (err) {
  console.error('❌ Error loading userRoutes:', err.message);
}

// ✅ Attach Routes
if (authRoutes && typeof authRoutes === 'function') {
  app.use('/api/auth', authRoutes);
  console.log('✅ Mounted /api/auth');
} else {
  console.warn('⚠️ authRoutes is not a valid router (not exported correctly)');
}

if (userRoutes && typeof userRoutes === 'function') {
  app.use('/api/users', userRoutes);
  console.log('✅ Mounted /api/users');
} else {
  console.warn('⚠️ userRoutes is not a valid router (not exported correctly)');
}

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
