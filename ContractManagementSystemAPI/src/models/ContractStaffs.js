import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './Users.js';
import Contract from './Contracts.js';
import ContractRole from './ContractRoles.js';

const ContractStaff = sequelize.define('ContractStaff', {
  ContractID: {
    type: DataTypes.INTEGER,
    references: {
      model: Contract,
      key: 'ContractID'
    },
    allowNull: false
  },
  UserID: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'UserID'
    },
    allowNull: false
  },
  ContractRoleID: {
    type: DataTypes.INTEGER,
    references: {
      model: ContractRole,
      key: 'ContractRoleID'
    },
    allowNull: false
  },
  AssignedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'ContractStaffs',
  timestamps: false
});

ContractStaff.belongsTo(Contract, { foreignKey: 'ContractID' });
ContractStaff.belongsTo(User, { foreignKey: 'UserID' });
ContractStaff.belongsTo(ContractRole, { foreignKey: 'ContractRoleID' });

export default ContractStaff;