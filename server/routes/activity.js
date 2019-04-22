const express = require('express');
const router = express.Router();

const activityCtrl = require('../controllers/activity');

router.post('', activityCtrl.saveActivity);

router.get('', activityCtrl.getActivities);

router.get('/:id', activityCtrl.getActivityById);

router.patch('/:id', activityCtrl.updateActivity);

router.delete('/:id', activityCtrl.deleteActivity)

module.exports = router;