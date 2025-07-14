const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const auth = require('../middlewares/auth');

router.post('/', auth, storyController.createStory);
router.get('/', storyController.getStories);
router.post('/:storyId/share', auth, storyController.shareStory);

// router.get('/:id/forks', storyController.listForks);

module.exports = router;
