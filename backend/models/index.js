'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config(); // ✅ Load env variables

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', // or 'postgres' if you're using PostgreSQL
    logging: false
  }
);

// ✅ Dynamically import all models
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// ✅ Define associations manually
const { User, Store, Rating } = db;

if (User && Store && Rating) {
  // User ↔ Ratings
  User.hasMany(Rating, { foreignKey: 'userId' });
  Rating.belongsTo(User, { foreignKey: 'userId' });

  // Store ↔ Ratings
  Store.hasMany(Rating, { foreignKey: 'storeId' });
  Rating.belongsTo(Store, { foreignKey: 'storeId' });

  // User ↔ Store (Store Owner)
  User.hasMany(Store, { foreignKey: 'ownerId' });
  Store.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
