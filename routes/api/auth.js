const express = require('express');
const router = express.Router();
const { validateBody, authenticate } = require('../../middlewares');
const {ctrlWrapper} = require('../../helpers');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/auth');

router.post('/users/register', validateBody(schemas.registerShema), ctrlWrapper(ctrl.register) );
router.post('/users/login', validateBody(schemas.loginShema), ctrlWrapper(ctrl.login) );
router.get('/users/current', authenticate, ctrlWrapper(ctrl.getCurrent));
router.get('/users/logout', authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;