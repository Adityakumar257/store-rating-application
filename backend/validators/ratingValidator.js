const { body } = require('express-validator');

exports.submitRatingValidator = [
  body('storeId')
    .notEmpty()
    .withMessage('Store ID is required'),
  body('value')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
];

exports.updateRatingValidator = [
  body('value')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
];
