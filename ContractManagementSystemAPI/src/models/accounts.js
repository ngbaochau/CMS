import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Account = sequelize.define('Account', {
  AccountID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Company: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ContactPerson: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Phone: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  WebLink: {
    type: DataTypes.STRING(50)
  },
  Address: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'Accounts',
  timestamps: false
});

export default Account;