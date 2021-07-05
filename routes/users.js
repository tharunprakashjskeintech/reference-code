var express = require('express');
const TokenController = require('../controllers/token.controller');
const userController = require('../controllers/user.controller');
var router = express.Router();
const jwt = require('jsonwebtoken')
const TokenAuth = require('../utils/authenticate')
const moment = require('moment')


router.post('/login', userController.getLogin)
router.get('/token-check', TokenAuth.Auth, (req, res, next) => {
    res.send(req.user)
})


router.post('/refresh-access-token',TokenController.refreshAccessToken)

router.post('/', userController.createUser)
router.post('/change_password', userController.changePassword)


module.exports = router;
