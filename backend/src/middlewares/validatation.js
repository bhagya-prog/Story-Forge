const { body, validationResult } = require('express-validator');

exports.validateStory = [
  body('title').notEmpty().withMessage('Title is required'),
  body('license').isIn(['CC0', 'CC-BY', 'CC-BY-SA']).withMessage('Invalid license')
];

exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
