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
    UserProfile.find({}).sort({'createdAt':-1}).exec((err, allUserProfiles) => {
        if (err) {
            return res.status(422).send(err);
        }
        allUserProfiles.reverse();
        return res.json(allUserProfiles);
    });
}

exports.getUserProfileById = (req, res) => {
    const profileId = req.params.id;

    UserProfile.findById(profileId).select('-__v').exec((err, foundProfile) => {
        if (err) {
            return res.status(422).send(err);
        }
        return res.json(foundProfile);
    });
}

exports.updateProfile = (req, res) => {
    const profileId = req.params.id;
    const profileData = req.body;
    UserProfile.findById(profileId, (err, foundProfile) => {
        if (err) {
            return res.status(422).send(err);
        }
        foundProfile.set(profileData);
        foundProfile.save((err, savedProfile) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json(savedProfile);
        })
    })
}

exports.updateFee = (req, res) => {
    const profileId = req.params.id;
    const feeData = req.body;

    UserProfile.findById(profileId, (err, foundProfile) => {
        if (err) {
            return res.status(422).send(err);
        }
        foundProfile.fee = feeData;
        foundProfile.type = "Participante"
        foundProfile.set(foundProfile);
        foundProfile.save((err, savedProfile) => {
            if (err) {
                return res.status(422).send(err);
            }
            //console.log(savedProfile)
            return res.json(savedProfile);
        })
    })
}

exports.updateActivitiesAndServicies = (req, res) => {
    const profileId = req.params.id;
    const data = req.body;

    const activities = data.activities;
    const services = data.services;

    UserProfile.findById(profileId, (err, foundProfile) => {
        if (err) {
            return res.status(422).send(err);
        }
        foundProfile.activities = activities
        foundProfile.services = services
        foundProfile.set(foundProfile);
        foundProfile.save((err, savedProfile) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json(savedProfile);
        })
    })
}

exports.deleteUserProfile = (req, res) => {
    const userProfileId = req.params.id;

    UserProfile.deleteOne({
        _id: userProfileId
    }, (err, deletedUser) => {
        if (err) {
            return res.status(422).send(err);
        }
        return res.json({status: 'DELETED'});
    })
}