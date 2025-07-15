const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const auth = require('../middlewares/auth');

router.post('/', auth, storyController.createStory);
router.get('/', storyController.getStories);
router.get('/:id', storyController.getStoryById);
router.put('/:id', auth, storyController.updateStory);
router.delete('/:id', auth, storyController.deleteStory);
router.post('/:id/fork', auth, storyController.forkStory);
router.post('/:storyId/share', auth, storyController.shareStory);

// router.get('/:id/forks', storyController.listForks);

module.exports = router;
