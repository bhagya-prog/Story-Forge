const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');
const auth = require('../middlewares/auth');

router.post('/', auth, clubController.createClub);
router.post('/:clubId/join', auth, clubController.joinClub);

module.exports = router;
