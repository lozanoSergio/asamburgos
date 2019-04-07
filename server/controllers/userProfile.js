const UserProfile = require('../models/userProfile')

exports.saveUserProfile = (req, res) => {
    const userProfileData = req.body;
    const profile = new UserProfile(userProfileData);
    const now = new Date();

    profile.createdAt = now;
    profile.updatedAt = now;

    profile.save((err, createdProfile) => {
        if(err) {
            return res.status(422).send(err);
        }

        return res.json(createdProfile);
    });
}

exports.getUserProfiles = (req, res) => {
    UserProfile.find({}).sort({'createdAt': -1}).exec((err, allUserProfiles) => {
        if (err) {
            return res.status(422).send(err);
        }
        return res.json(allUserProfiles);
    });
}