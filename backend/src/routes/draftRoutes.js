const express = require('express');
const router = express.Router();
const draftController = require('../controllers/draftController');
const auth = require('../middlewares/auth');

router.put('/:storyId', auth, draftController.autoSave);

module.exports = router;
