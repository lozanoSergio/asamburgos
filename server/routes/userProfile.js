const express = require('express');
const router = express.Router();

const userProfileCtrl = require('../controllers/userProfile');
//Auth
const authService = require('../services/auth');

router.post('', authService.checkJWT, authService.checkRole('admin'), userProfileCtrl.saveUserProfile);

router.get('', authService.checkJWT, authService.checkRole('admin'), userProfileCtrl.getUserProfiles);

router.get('/:id', authService.checkJWT, authService.checkRole('admin'), userProfileCtrl.getUserProfileById);

router.patch('/:id', authService.checkJWT, authService.checkRole('admin'), userProfileCtrl.updateProfile);

router.patch('/fee/:id', authService.checkJWT, authService.checkRole('admin'), userProfileCtrl.updateFee);

router.patch('/userActivitiesAndServicies/:id', authService.checkJWT, authService.checkRole('admin'), userProfileCtrl.updateActivitiesAndServicies);

router.delete('/:id', authService.checkJWT, authService.checkRole('admin'), userProfileCtrl.deleteUserProfile);

module.exports = router;