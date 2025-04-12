import AppRoleModel from '../models/AppRole.js';
import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const AppRole = AppRoleModel(sequelize, DataTypes);

export const validateRegister = async (req, res, next) => {
  const { username, password, confirmPassword, email, phone, role } = req.body;

  if (!username || !password || !confirmPassword || !email || !phone || !role) {
    return res.status(400).json({ message: 'Please fill in all information.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }
  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Invalid phone number. Please enter 10-11 digits.' });
  }
  try {
    const roleData = await AppRole.findOne({ where: { AppRoleName: role } });
    if (!roleData) return res.status(400).json({ message: 'Invalid role.' });

    req.roleId = roleData.AppRoleID;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error while checking role.' });
  }
};
