const { Store, Rating, User } = require('../models');
const { Op } = require('sequelize');

exports.addStore = async (req, res) => {
  const { name, email, address, ownerId } = req.body;
  const store = await Store.create({ name, email, address, ownerId });
  res.status(201).json(store);
};

exports.getAllStores = async (req, res) => {
  const stores = await Store.findAll({
    include: [{ model: Rating }]
  });

  const response = stores.map(store => {
    const avgRating = store.Ratings.length
      ? store.Ratings.reduce((a, b) => a + b.value, 0) / store.Ratings.length
      : 0;
    return { ...store.toJSON(), avgRating };
  });

  res.json(response);
};

exports.searchStores = async (req, res) => {
  const { name, address } = req.query;
  const stores = await Store.findAll({
    where: {
      name: { [Op.iLike]: `%${name || ''}%` },
      address: { [Op.iLike]: `%${address || ''}%` }
    }
  });
  res.json(stores);
};
