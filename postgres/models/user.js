module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    admin: {
      type: DataTypes.BOOLEAN
    }
  });

  return Users;
};
