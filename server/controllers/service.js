const Service = require('../models/service')

exports.saveService = (req, res) => {
    const serviceData = req.body;
    const service = new Service(serviceData);
    const now = new Date();

    service.createdAt = now;
    service.updatedAt = now;

    service.save((err, createdService) => {
        if(err) {
            return res.status(422).send(err);
        }

        return res.json(createdService);
    });
}

exports.getService = (req, res) => {
    Service.find({}).sort({'createdAt': -1}).exec((err, allActivities) => {
        if (err) {
            return res.status(422).send(err);
        }
        return res.json(allActivities);
    });
}

exports.getServiceById = (req, res) => {
    const serviceId = req.params.id;

    Service.findById(serviceId).select('-__v').exec((err, foundService) => {
        if (err) {
            return res.status(422).send(err);
        }
        return res.json(foundService);
    });
}

exports.updateService = (req, res) => {
    const serviceId = req.params.id;
    const serviceData = req.body;
    Service.findById(serviceId, (err, foundService) => {
        if (err) {
            return res.status(422).send(err);
        }
        foundService.set(serviceData);
        foundService.save((err, savedService) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json(savedService);
        })
    })
}