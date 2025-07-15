const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/points',auth, userController.addPoints); // Consider adding auth middleware if needed

// Profile routes
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

module.exports = router;
