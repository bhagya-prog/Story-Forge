const express = require('express');
const router = express.Router();
const moderationController = require('../controllers/moderationController');
const auth = require('../middlewares/auth');

router.post('/flag', auth, moderationController.flagContent);
router.put('/flag/:flagId/resolve', auth, moderationController.resolveFlag);

module.exports = router;
