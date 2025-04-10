import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ContractRole = sequelize.define('ContractRole', {
  ContractRoleID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ContractRoleName: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  Level: {
    type: DataTypes.ENUM('Junior', 'Lead', 'Senior')
  },
  Description: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'ContractRoles',
  timestamps: false
});

export default ContractRole;