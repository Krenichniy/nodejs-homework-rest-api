const express = require('express');
const router = express.Router();
const { validateBody, authenticate } = require('../../middlewares');
const {ctrlWrapper} = require('../../helpers');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/auth');

router.post('/register', validateBody(schemas.registerShema), ctrlWrapper(ctrl.register) );
router.post('/login', validateBody(schemas.loginShema), ctrlWrapper(ctrl.login) );
router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;