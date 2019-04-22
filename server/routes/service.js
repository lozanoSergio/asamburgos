const express = require('express');
const router = express.Router();

const serviceCtrl = require('../controllers/service');

router.post('', serviceCtrl.saveService);

router.get('', serviceCtrl.getService);

router.get('/:id', serviceCtrl.getServiceById);

router.patch('/:id', serviceCtrl.updateService);

router.delete('/:id', serviceCtrl.deleteService);

module.exports = router;