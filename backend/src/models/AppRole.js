module.exports = (sequelize, DataTypes) => {
    const AppRole = sequelize.define('AppRole', {
      AppRoleID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      AppRoleName: DataTypes.STRING,
      Description: DataTypes.STRING
    }, {
      tableName: 'approles',
      timestamps: false
    });
  
    return AppRole;
  };
  