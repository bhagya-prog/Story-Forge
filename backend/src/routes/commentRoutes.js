const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middlewares/auth');

// Comment CRUD operations
router.post('/:storyId/comments', auth, commentController.createComment);
router.get('/:storyId/comments', commentController.getCommentsByStory);
router.put('/comments/:commentId', auth, commentController.updateComment);
router.delete('/comments/:commentId', auth, commentController.deleteComment);

// Comment reactions
router.post('/comments/:commentId/like', auth, commentController.likeComment);
router.delete('/comments/:commentId/like', auth, commentController.unlikeComment);

module.exports = router;
