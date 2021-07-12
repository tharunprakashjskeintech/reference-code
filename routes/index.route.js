
var express = require('express');

// router instance
var router = express.Router();


// user router instance (it contains all methods and functionalites for users)
var userRouter = require('./users');

var subscriptionRouter = require('./subscription-plan.route');
 var dashboardRouter = require('./dashboard.route')
 var LocationRouter = require('./location.route')
// creating a unique route for users
router.use('/user', userRouter)

// creating a unique route for subscription
router.use('/subscription', subscriptionRouter)

// creating a unique route for users
router.use('/dashboard', dashboardRouter)

router.use('/location', LocationRouter)
module.exports = router