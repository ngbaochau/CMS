import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateRegister } from '../middlewares/validateRegister.js';
import sendConfirmationEmail from '../utils/sendConfirmationEmail.js';
import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';
import UserModel from '../models/User.js';
import AppRoleModel from '../models/AppRole.js';

const User = UserModel(sequelize, DataTypes);
const AppRole = AppRoleModel(sequelize, DataTypes);
const router = express.Router();

router.post('/register', validateRegister, async (req, res) => {
  const { username, password, email, phone, fullName, address } = req.body;

  try {
    const existingUser = await User.findOne({ where: { UserName: username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists.' });
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
    console.error('Error during registration:', err);
    return res.status(500).json({ message: 'Error processing registration.' });
  }
});

router.get('/confirm/:token', async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (user.IsActive) {
      return res.send(`
        <script>
          alert('Previously Verified Account.');
          window.location.href = 'http://localhost:3001/login';
        </script>
      `);
    }

    user.IsActive = true;
    await user.save();

    return res.redirect('http://localhost:3001/auth/verify-success');
  } catch (err) {
    console.error('Email confirmation error:', err);
    return res.send(`
      <script>
        alert('Verification link is invalid or expired.');
        window.location.href = 'http://localhost:3001/login';
      </script>
    `);
  }
});

export default router;
