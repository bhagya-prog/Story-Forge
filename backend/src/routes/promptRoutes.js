const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptController');

router.get('/', promptController.getPrompt);

module.exports = router;
