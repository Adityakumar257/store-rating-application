const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Store = sequelize.define('Store', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true }
    },
    address: {
      type: DataTypes.STRING(400)
    }
  });

  return Store;
};
