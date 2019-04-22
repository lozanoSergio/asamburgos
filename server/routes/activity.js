const express = require('express');
const router = express.Router();

const activityCtrl = require('../controllers/activity');
//Auth
const authService = require('../services/auth');

router.post('', authService.checkJWT, authService.checkRole('admin'), activityCtrl.saveActivity);

router.get('', authService.checkJWT, authService.checkRole('admin'), activityCtrl.getActivities);

router.get('/:id', authService.checkJWT, authService.checkRole('admin'), activityCtrl.getActivityById);

router.patch('/:id', authService.checkJWT, authService.checkRole('admin'), activityCtrl.updateActivity);

router.delete('/:id', authService.checkJWT, authService.checkRole('admin'), activityCtrl.deleteActivity)

module.exports = router;