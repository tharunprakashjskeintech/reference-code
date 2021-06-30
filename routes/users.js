var express = require('express');
const { authenticate } = require('../utils/authenticate');
const userController = require('../controllers/user.controller');
var router = express.Router();


router.post('/login', userController.getLogin)
router.post('/', userController.createAdminUser)
router.post('/change_password', userController.changePassword)


module.exports = router;
