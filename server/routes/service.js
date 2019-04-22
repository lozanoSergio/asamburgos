const express = require('express');
const router = express.Router();

const serviceCtrl = require('../controllers/service');
//Auth
const authService = require('../services/auth');

router.post('', authService.checkJWT, authService.checkRole('admin'), serviceCtrl.saveService);

router.get('', authService.checkJWT, authService.checkRole('admin'), serviceCtrl.getService);

router.get('/:id', authService.checkJWT, authService.checkRole('admin'), serviceCtrl.getServiceById);

router.patch('/:id', authService.checkJWT, authService.checkRole('admin'), serviceCtrl.updateService);

router.delete('/:id', authService.checkJWT, authService.checkRole('admin'), serviceCtrl.deleteService);

module.exports = router;