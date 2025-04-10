const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateRegister = require('../middlewares/validateRegister');
const sendConfirmationEmail = require('../utils/sendConfirmationEmail');

const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const User = require('../models/User')(sequelize, DataTypes);
const AppRole = require('../models/AppRole')(sequelize, DataTypes);

const router = express.Router();

router.post('/register', validateRegister, async (req, res) => {
  const { username, password, email, phone, fullName, address } = req.body;

  try {
    const existingUser = await User.findOne({ where: { UserName: username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Tên người dùng đã tồn tại.' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = await User.create({
      UserName: username,
      Password: hashedPassword,
      Email: email,
      Phone: phone,
      AppRoleID: req.roleId,
      FullName: fullName,
      Address: address,
      IsActive: false,
    });

    
    const token = jwt.sign({ userId: newUser.UserID }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

   
    await sendConfirmationEmail(email, token);

    return res.status(201).json({
      message: 'Registration successful! Please check your email to confirm your account.',
    });
  } catch (err) {
    console.error('❌ Error during registration:', err);
    return res.status(500).json({ message: 'Error processing registration.' });
  }
});


router.get('/confirm/:token', async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) return res.status(404).send('User not found.');
    if (user.IsActive) return res.send('Previously verified account.');

    user.IsActive = true;
    await user.save();

    res.send('✅ Your account has been successfully verified.!');
  } catch (err) {
    console.error('❌ Email confirmation error:', err);
    res.status(400).send('❌ The confirmation link is invalid or has expired.');
  }
});

module.exports = router;
