
var express = require('express');

// router instance
var router = express.Router();


// user router instance (it contains all methods and functionalites for users)
var userRouter = require('./users');

var subscriptionRouter = require('./subscription-plan.route');

// creating a unique route for users
router.use('/user', userRouter)

// creating a unique route for subscription
router.use('/subscription', subscriptionRouter)

module.exports = router