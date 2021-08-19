
var express = require('express');

// router instance
var router = express.Router();


// user router instance (it contains all methods and functionalites for users)
var userRouter = require('./users');

var subscriptionRouter = require('./subscription-plan.route');
 var dashboardRouter = require('./dashboard.route')
 var LocationRouter = require('./location.route')
 var chatRouter=require('./chat.routes');
// creating a unique route for users
router.use('/user', userRouter)

// creating a unique route for subscription
router.use('/subscription', subscriptionRouter)

// creating a unique route for dashboard
router.use('/dashboard', dashboardRouter)

// creating a unique route for LocationRouter
router.use('/location', LocationRouter)

// creating a unique route for chat
router.use('/chat',chatRouter)

module.exports = router