const Comment = require('../models/commentModel');
const Story = require('../models/storyModel');

exports.createComment = async (req, res, next) => {
  try {
    const { content, parentComment } = req.body;
    const { storyId } = req.params;

    // Verify story exists
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    // If it's a reply, verify parent comment exists
    if (parentComment) {
      const parent = await Comment.findById(parentComment);
      if (!parent) {
        return res.status(404).json({ error: 'Parent comment not found' });
      }
      if (parent.story.toString() !== storyId) {
        return res.status(400).json({ error: 'Parent comment does not belong to this story' });
      }
    }

    const comment = await Comment.create({
      content,
      author: req.user.id,
      story: storyId,
      parentComment: parentComment || null
    });

    // If it's a reply, add to parent's replies
    if (parentComment) {
      await Comment.findByIdAndUpdate(parentComment, {
        $addToSet: { replies: comment._id }
      });
    }

    // Populate author data
    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username avatar')
      .populate('replies');

    res.status(201).json({ comment: populatedComment });
  } catch (err) {
    next(err);
  }
};

exports.getCommentsByStory = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Get top-level comments (no parent)
    const comments = await Comment.find({ 
      story: storyId, 
      parentComment: null,
      isDeleted: false 
    })
      .populate('author', 'username avatar')
      .populate({
        path: 'replies',
        populate: {
          path: 'author',
          select: 'username avatar'
        }
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Comment.countDocuments({ 
      story: storyId, 
      parentComment: null,
      isDeleted: false 
    });

    res.json({
      comments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if user is the author
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this comment' });
    }

    comment.content = content;
    await comment.save();

    const populatedComment = await Comment.findById(commentId)
      .populate('author', 'username avatar');

    res.json({ comment: populatedComment });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if user is the author
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this comment' });
    }

    // Soft delete
    comment.isDeleted = true;
    await comment.save();

    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.likeComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { $addToSet: { likes: req.user.id } },
      { new: true }
    ).populate('author', 'username avatar');

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ 
      comment, 
      likesCount: comment.likes.length,
      isLiked: comment.likes.includes(req.user.id)
    });
  } catch (err) {
    next(err);
  }
};

exports.unlikeComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { $pull: { likes: req.user.id } },
      { new: true }
    ).populate('author', 'username avatar');

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ 
      comment, 
      likesCount: comment.likes.length,
      isLiked: false
    });
  } catch (err) {
    next(err);
  }
};
