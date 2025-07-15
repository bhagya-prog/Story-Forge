const express = require('express');
const router = express.Router();
const mergeRequestController = require('../controllers/mergeRequestController');
const auth = require('../middlewares/auth');

router.post('/', auth, mergeRequestController.createMergeRequest);
router.put('/:mergeRequestId/approve', auth, mergeRequestController.approveMergeRequest);
router.put('/:mergeRequestId/reject', auth, mergeRequestController.rejectMergeRequest);

module.exports = router;
