import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Account from './Accounts.js';

const Project = sequelize.define('Project', {
  ProjectID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ProjectName: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  Description: {
    type: DataTypes.TEXT
  },
  AccountID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Account,
      key: 'AccountID'
    }
  },
  StartDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  EndDate: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'Projects',
  timestamps: false
});

Project.belongsTo(Account, { foreignKey: 'AccountID' });

export default Project;
