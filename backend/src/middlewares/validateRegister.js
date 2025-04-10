const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const AppRoleModel = require('../models/AppRole');

const AppRole = AppRoleModel(sequelize, DataTypes);

const validateRegister = async (req, res, next) => {
  const { username, password, confirmPassword, email, phone, role } = req.body;

  if (!username || !password || !confirmPassword || !email || !phone || !role) {
    return res.status(400).json({ message: 'Please fill in all information.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
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

module.exports = validateRegister;
