const express = require('express');
const ctrl = require('../../controllers/contacts');
const {ctrlWrapper} = require('../../helpers');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const {schemas} = require('../../models/contact');

const router = express.Router()
  
router.get('/',authenticate, ctrlWrapper(ctrl.getAll))

router.get('/:contactId',authenticate, isValidId,  ctrlWrapper(ctrl.getContactById))

router.post('/', authenticate, validateBody(schemas.addShema), ctrlWrapper(ctrl.addContact))

router.put('/:contactId',authenticate, isValidId, validateBody(schemas.addShema), ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite',authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite))

router.delete('/:contactId',authenticate,isValidId, ctrlWrapper(ctrl.removeContact))


module.exports = router
