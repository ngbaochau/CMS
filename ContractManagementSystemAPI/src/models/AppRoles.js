import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const AppRole = sequelize.define('AppRole', {
  AppRoleID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  AppRoleName: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'AppRoles',
  timestamps: false
});

export default AppRole;