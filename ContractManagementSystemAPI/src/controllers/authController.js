const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/users'); 
const loginUser = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'Users not found' });
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) return res.status(400).json({ message: 'Wrong account or password' });
  const accessToken = jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({
    accessToken,
    role: user.role
  });
};
const getDashboard = (req, res) => {
  res.send('Welcome to the dashboard! Only Admin or PM can access this.');
};
const getAdminOnly = (req, res) => {
  res.send('Welcome to the Admin dashboard! Only Admin can access this.');
};
const getPublic = (req, res) => {
  res.send('Welcome to the public route.');
};
module.exports = {
  loginUser,
  getDashboard,
  getAdminOnly,
  getPublic
};
