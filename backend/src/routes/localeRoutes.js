const express = require('express');
const router = express.Router();
const localeController = require('../controllers/localeController');

router.get('/', localeController.getLocale);

module.exports = router;
