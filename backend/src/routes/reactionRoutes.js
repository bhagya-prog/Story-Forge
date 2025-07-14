const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');
const auth = require('../middlewares/auth');

router.post('/:storyId/like', auth, reactionController.likeStory);
router.post('/:storyId/bookmark', auth, reactionController.bookmarkStory);

module.exports = router;
