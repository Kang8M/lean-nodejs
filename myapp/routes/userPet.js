var express = require('express');
var router = express.Router();
var userPetController = require('../controllers/user-pet');
var prefix = '/user/:user_id';

router.post(prefix + '/pet', userPetController.create);

module.exports = router;
