const Activity = require("../models/activity");
const User = require("../models/userProfile");

exports.saveActivity = (req, res) => {
  const activityData = req.body;
  const activity = new Activity(activityData);
  const now = new Date();

  activity.createdAt = now;
  activity.updatedAt = now;

  activity.save((err, createdActivity) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(createdActivity);
  });
};

exports.getActivities = (req, res) => {
  Activity.find({})
    .sort({ createdAt: -1 })
    .exec((err, allActivities) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json(allActivities);
    });
};

exports.getActivityById = (req, res) => {
  const activityId = req.params.id;

  Activity.findById(activityId)
    .select("-__v")
    .exec((err, foundActivity) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json(foundActivity);
    });
};

exports.getUsersInActivity = (req, res) => {
  const activityId = req.params.id;

  User.find({}).exec((err, allUsers) => {
    if (err) {
      return res.status(422).send(err);
    }
    const users = allUsers.filter(
      user =>
        user.activities &&
        user.activities.some(activity => activity.id === activityId)
    );
    return res.json(users);
  });
};

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
    });
  });
};

exports.deleteActivity = (req, res) => {
  const activityId = req.params.id;

  Activity.deleteOne(
    {
      _id: activityId
    },
    (err, deletedActivity) => {
      if (err) {
        return res.status(422).send(err);
      }
      User.find({ activities: { $elemMatch: { id: activityId } } })
        .exec()
        .then(users => {
          users.forEach(user => {
            user.activities = user.activities.filter(entry => {
              if (entry.id !== activityId) {
                return entry;
              }
            });
            user.save();
          });
        });
      return res.json({ status: "DELETED" });
    }
  );
};
