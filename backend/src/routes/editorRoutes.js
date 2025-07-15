const express = require('express');
const router = express.Router();
const editorController = require('../controllers/editorController');
const auth = require('../middlewares/auth');
const authRole = require('../middlewares/authRole');

// Only editors and admins can access these routes
router.get('/stories', auth, authRole(['editor', 'admin']), editorController.listAllStories);
router.put('/stories/:storyId', auth, authRole(['editor', 'admin']), editorController.editStory);
router.get('/users', auth, authRole(['editor', 'admin']), editorController.listAllUsers);
router.put('/users/:userId/ban', auth, authRole(['editor', 'admin']), editorController.toggleUserBan);

module.exports = router;
