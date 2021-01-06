var express = require('express');
var router = express.Router();
var petController = require('../controllers/pet');

router.get('/:pet_id', petController.show);

router.get('/:pet_id/edit', petController.edit);

router.put('/:pet_id/', petController.update);

module.exports = router;
