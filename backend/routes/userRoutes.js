const express = require('express');
const { getAllUsers, getSingleUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes
router.get('/', protect, getAllUsers);
router.get('/:id', protect, getSingleUser);
const { updatePassword } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.put('/update-password', authMiddleware, updatePassword);

module.exports = router; // ✅ Properly exporting router
