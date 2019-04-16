const Activity = require('../models/activity')

exports.saveActivity = (req, res) => {
    const activityData = req.body;
    console.log("Launch")
    const activity = new Activity(activityData);
    const now = new Date();

    activity.createdAt = now;
    activity.updatedAt = now;

    activity.save((err, createdActivity) => {
        if(err) {
            return res.status(422).send(err);
        }

        return res.json(createdActivity);
    });
}

exports.getActivities = (req, res) => {
    Activity.find({}).sort({'createdAt': -1}).exec((err, allActivities) => {
        if (err) {
            return res.status(422).send(err);
        }
        return res.json(allActivities);
    });
}

exports.getActivityById = (req, res) => {
    const activityId = req.params.id;

    Activity.findById(activityId).select('-__v').exec((err, foundActivity) => {
        if (err) {
            return res.status(422).send(err);
        }
        return res.json(foundActivity);
    });
}

exports.updateActivity = (req, res) => {
    const activityId = req.params.id;
    const activityData = req.body;
    Activity.findById(activityId, (err, foundActivity) => {
        if (err) {
            return res.status(422).send(err);
        }
        foundActivity.set(activityData);
        foundActivity.save((err, savedActivity) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json(savedActivity);
        })
    })
}