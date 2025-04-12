import AppRoleModel from '../models/AppRole.js';
import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const AppRole = AppRoleModel(sequelize, DataTypes);

export const validateRegister = async (req, res, next) => {
  const { username, password, email, phone, role } = req.body;

  if (!username || !password || !email || !phone || !role) {
    return res.status(400).json({ message: 'Please fill in all information.' });
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Invalid phone number. Please enter 10-11 digits.' });
  }

  try {
    const roleData = await AppRole.findOne({ where: { AppRoleName: role } });
    if (!roleData) {
      return res.status(400).json({ message: 'Role not found.' });
    }
    req.roleId = roleData.AppRoleID;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error while checking role.' });
  }
};
