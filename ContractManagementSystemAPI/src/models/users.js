import { Sequelize,DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import AppRole from './AppRoles.js';

const User = sequelize.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  FullName: {
    type: DataTypes.STRING(100)
  },
  UserName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING(50)
  },
  Phone: {
    type: DataTypes.CHAR(10)
  },
  Address: {
    type: DataTypes.STRING(100),
  },
  AppRoleID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: AppRole,
      key: 'AppRoleID'
    }
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  CreateAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'Users',
  timestamps: false
});

User.belongsTo(AppRole, { foreignKey: 'AppRoleID' });

export default User;
