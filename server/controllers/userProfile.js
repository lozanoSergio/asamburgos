const UserProfile = require('../models/userProfile')

exports.saveUserProfile = (req, res) => {
    const userProfileData = req.body;
    const profile = new UserProfile(userProfileData);

    profile.save((err, createdProfile) => {
        if(err) {
            return res.status(422).send(err);
        }
        return res.json(createdProfile);
    });
}