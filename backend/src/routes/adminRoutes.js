const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth');
const authRole = require('../middlewares/authRole');

router.get('/dashboard', auth, authRole('admin'), adminController.getDashboard);

router.put('/users/:userId', auth, authRole('admin'), adminController.manageUser);

router.put('/flags/:flagId/resolve', auth, authRole('admin'), adminController.resolveFlag);

module.exports = router;
