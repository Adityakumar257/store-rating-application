const jwt = require('jsonwebtoken');

// Protect middleware to verify JWT and attach user to request
exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token (synchronous version for simplicity)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // typically { id, role, etc. }
    next();

  } catch (error) {
    console.error('JWT Protect Middleware Error:', error.message);
    return res.status(403).json({ error: 'Token verification failed or expired' });
  }
};
exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id; // user set by auth middleware

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};