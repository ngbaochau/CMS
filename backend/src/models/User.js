module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      UserID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      UserName: DataTypes.STRING,
      Password: DataTypes.STRING,
      Email: DataTypes.STRING,
      Phone: DataTypes.STRING,
      AppRoleID: DataTypes.INTEGER,
      CreateAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      FullName: DataTypes.STRING,
      Address: DataTypes.STRING,
      IsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    }, {
      tableName: 'users', 
      timestamps: false   
    });
  
    return User;
  };
  