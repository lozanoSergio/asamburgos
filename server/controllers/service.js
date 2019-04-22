const Service = require('../models/service');
const User = require("../models/userProfile");

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
    Service.find({}).sort({'createdAt': -1}).exec((err, allServices) => {
        if (err) {
            return res.status(422).send(err);
        }
        return res.json(allServices);
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

exports.deleteService = (req, res) => {
    const serviceId = req.params.id;
  
    Service.deleteOne(
      {
        _id: serviceId
      },
      (err, deletedService) => {
        if (err) {
          return res.status(422).send(err);
        }
        User.find({ services: { $elemMatch: { id: serviceId } } })
          .exec()
          .then(users => {
            users.forEach(user => {
              user.services = user.services.filter(entry => {
                if (entry.id !== serviceId) {
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