import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Contract from './Contracts.js';
import User from './Users.js';

const ContractLog = sequelize.define('ContractLog', {
  LogID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ContractID: {
    type: DataTypes.INTEGER,
    references: {
      model: Contract,
      key: 'ContractID'
    },
    allowNull: false
  },
  Action: {
    type: DataTypes.ENUM('Created', 'Edited', 'Deleted'),
    allowNull: false
  },
  ActionBy: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'UserID'
    },
    allowNull: false
  },
  ActionDate: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  Note: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'ContractLogs',
  timestamps: false
});

ContractLog.belongsTo(Contract, { foreignKey: 'ContractID' });
ContractLog.belongsTo(User, { foreignKey: 'ActionBy' });

export default ContractLog;
