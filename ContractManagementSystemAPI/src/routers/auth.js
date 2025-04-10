const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');
const {
  loginUser,
  getDashboard,
  getAdminOnly,
  getPublic
} = require('../controllers/authController');
const router = express.Router();
router.post('/login', loginUser);
router.get('/dashboard', authenticateToken, authorizeRoles('Admin', 'PM'), getDashboard);
router.get('/admin', authenticateToken, authorizeRoles('Admin'), getAdminOnly);
router.get('/public', getPublic);

module.exports = router;
