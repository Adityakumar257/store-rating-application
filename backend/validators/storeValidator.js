const { body } = require('express-validator');

exports.storeValidator = [
  body('name')
    .notEmpty()
    .withMessage('Store name is required'),
  body('email')
    .isEmail()
    .optional({ checkFalsy: true })
    .withMessage('Invalid email format'),
  body('address')
    .isLength({ max: 400 })
    .withMessage('Address must not exceed 400 characters'),
  body('ownerId')
    .notEmpty()
    .withMessage('Store must have an ownerId'),
];
