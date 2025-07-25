const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Rating = sequelize.define('Rating', {
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 }
    }
  });

  return Rating;
};
