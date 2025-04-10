import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Project from './Projects.js';

const Contract = sequelize.define('Contract', {
  ContractID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ContractCode: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ProjectID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project,
      key: 'ProjectID'
    }
  },
  SignDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  TotalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  WorkingDays: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  StartDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  EndDate: {
    type: DataTypes.DATE
  },
  Status: {
    type: DataTypes.ENUM('Draft', 'WaitingForApproval', 'Signed', 'InEffect', 'Terminated', 'Expired', 'Cancelled'),
    allowNull: false
  }
}, {
  tableName: 'Contracts',
  timestamps: false
});

Contract.belongsTo(Project, { foreignKey: 'ProjectID' });

export default Contract;