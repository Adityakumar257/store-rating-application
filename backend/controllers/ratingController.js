const { Rating } = require('../models');

exports.submitRating = async (req, res) => {
  const { storeId, value } = req.body;
  const existing = await Rating.findOne({
    where: { storeId, userId: req.user.id }
  });

  if (existing) {
    return res.status(400).json({ message: 'You already rated this store' });
  }

  const rating = await Rating.create({ storeId, userId: req.user.id, value });
  res.status(201).json(rating);
};

exports.updateRating = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const rating = await Rating.findOne({ where: { id, userId: req.user.id } });
  if (!rating) return res.status(404).json({ message: 'Rating not found' });

  rating.value = value;
  await rating.save();
  res.json(rating);
};
