var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');

router.get('/', userController.list);

router.get('/:user_id/edit', userController.edit);

router.put('/:user_id', userController.update);

router.get('/:user_id', userController.show);

module.exports = router;
