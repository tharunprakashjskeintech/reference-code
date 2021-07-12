var express = require('express');
const TokenController = require('../controllers/token.controller');
const userController = require('../controllers/user.controller');
var router = express.Router();
const jwt = require('jsonwebtoken')
const TokenAuth = require('../utils/authenticate')
const moment = require('moment')
const FileUpload = require('../utils/file');

router.post('/login', userController.getLogin)
router.get('/token-check', TokenAuth.Auth, (req, res, next) => {
    res.send(req.user)
})
router.get('', userController.fetch)

router.post('/refresh-access-token',TokenController.refreshAccessToken)

router.post('/',FileUpload.base64ToImage("profile_pic", "profile_pic"),FileUpload.base64ToImage("router_picture", "router_picture"), userController.createUser)

router.post('/change_password', userController.changePassword)

//Get Tablet users
router.get('/getTabletUsers', userController.getTabletUsers)

// Contact users
router.get('/getContactUsers', userController.getContactUsers)

router.post('/addContactUsers', userController.addContactUsers)

router.delete('/:id', userController.delete)

router.put('/:id',FileUpload.base64ToImage("profile_pic", "profile_pic"), userController.update)

router.post('/system-admin',  userController.getAllDeatails)

router.post('/forgotPassword',userController.forgotPassword)

router.post('/validate_otp',userController.validateOTP)


module.exports = router;
