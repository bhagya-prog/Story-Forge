const express = require('express');
const router = express.Router();
const bulkController = require('../controllers/bulkController');
const auth = require('../middlewares/auth');

router.post('/archive', auth, bulkController.archiveStories);

module.exports = router;
