
var express = require('express');

// router instance
var router = express.Router();


// user router instance (it contains all methods and functionalites for users)
var userRouter = require('./users');


// creating a unique route for users
router.use('/user', userRouter)

module.exports = router