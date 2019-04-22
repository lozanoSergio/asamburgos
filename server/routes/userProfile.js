const express = require('express');
const router = express.Router();

const userProfileCtrl = require('../controllers/userProfile');

router.post('', userProfileCtrl.saveUserProfile);

router.get('', userProfileCtrl.getUserProfiles);

router.get('/:id', userProfileCtrl.getUserProfileById);

router.patch('/:id', userProfileCtrl.updateProfile);

router.patch('/fee/:id', userProfileCtrl.updateFee);

router.patch('/userActivitiesAndServicies/:id', userProfileCtrl.updateActivitiesAndServicies);

router.delete('/:id', userProfileCtrl.deleteUserProfile);

module.exports = router;