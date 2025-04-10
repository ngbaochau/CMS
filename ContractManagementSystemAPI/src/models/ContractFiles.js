import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Contract from './Contracts.js';
import User from './Users.js';

const ContractFile = sequelize.define('ContractFile', {
  FileID: {
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
  FileName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  FilePath: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  UploadDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  UploadBy: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'UserID'
    },
    allowNull: false
  }
}, {
  tableName: 'ContractFiles',
  timestamps: false
});

ContractFile.belongsTo(Contract, { foreignKey: 'ContractID' });
ContractFile.belongsTo(User, { foreignKey: 'UploadBy' });

export default ContractFile;