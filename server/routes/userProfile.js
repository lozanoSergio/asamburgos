const express = require('express');
const router = express.Router();

const userProfileCtrl = require('../controllers/userProfile');

router.post('', userProfileCtrl.saveUserProfile);

module.exports = router;