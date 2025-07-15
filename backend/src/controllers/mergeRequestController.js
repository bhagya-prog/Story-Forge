// this file handles merge request creation and notifications

const MergeRequest = require('../models/mergeRequestModel');
const Story = require('../models/storyModel');
const { notifyMergeRequest } = require('../services/notificationService');
const { addPointsToUser, updateUserStreak } = require('./userController');

exports.createMergeRequest = async (req, res, next) => {
  try {
    const { storyId, forkId, justification } = req.body;
    
    if (!storyId || !forkId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const story = await Story.findById(storyId).lean();
    if (!story) return res.status(404).json({ error: 'Story not found' });
    
    const mergeRequest = await MergeRequest.create({
      storyId,
      forkId,
      justification,
      requester: req.user.id
    });
    
    await notifyMergeRequest(story.author, req.user.id, storyId);
    
    res.status(201).json(mergeRequest);
  } catch (err) {
    next(err);
  }
};

exports.approveMergeRequest = async (req, res, next) => {
  try {
    const { mergeRequestId } = req.params;
    const mergeRequest = await MergeRequest.findById(mergeRequestId);
    if (!mergeRequest) {
      return res.status(404).json({ error: 'Merge request not found' });
    }

    if (mergeRequest.status !== 'pending') {
      return res.status(400).json({ error: 'Merge request already processed' });
    }

    // Update merge request status
    mergeRequest.status = 'accepted';
    await mergeRequest.save();

    // Merge fork content into parent story
    const parentStory = await Story.findById(mergeRequest.storyId);
    const forkStory = await Story.findById(mergeRequest.forkId);
    if (!parentStory || !forkStory) {
      return res.status(404).json({ error: 'Parent or fork story not found' });
    }

    const latestForkVersion = forkStory.versions[forkStory.versions.length - 1];
    parentStory.versions.push({
      content: latestForkVersion.content,
      author: mergeRequest.requester
    });
    await parentStory.save();

    // Award points and update streaks
    await addPointsToUser(mergeRequest.requester, 10); // 10 points for merge
    await addPointsToUser(parentStory.author, 5); // 5 points for accepting merge
    await updateUserStreak(mergeRequest.requester);
    await updateUserStreak(parentStory.author);

    res.json({ message: 'Merge request approved and merged successfully' });
  } catch (err) {
    next(err);
  }
};

exports.rejectMergeRequest = async (req, res, next) => {
  try {
    const { mergeRequestId } = req.params;
    const mergeRequest = await MergeRequest.findById(mergeRequestId);
    if (!mergeRequest) {
      return res.status(404).json({ error: 'Merge request not found' });
    }

    if (mergeRequest.status !== 'pending') {
      return res.status(400).json({ error: 'Merge request already processed' });
    }

    // Update merge request status
    mergeRequest.status = 'rejected';
    await mergeRequest.save();

    res.json({ message: 'Merge request rejected successfully' });
  } catch (err) {
    next(err);
  }
};