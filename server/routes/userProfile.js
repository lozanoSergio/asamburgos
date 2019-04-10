const express = require('express');
const router = express.Router();

const userProfileCtrl = require('../controllers/userProfile');

router.post('', userProfileCtrl.saveUserProfile);

router.get('', userProfileCtrl.getUserProfiles);

router.get('/:id', userProfileCtrl.getUserProfileById);

module.exports = router;