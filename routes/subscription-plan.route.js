var express = require('express');
const { authenticate } = require('../utils/authenticate');
const subscriptionController = require('../controllers/subscription-plan-controller ');
var router = express.Router();
const TokenAuth = require('../utils/authenticate')

router.post('/', subscriptionController.createPlan)

router.get('/', subscriptionController.getSubscriptionPlan)

router.post('/create-internet-plan', subscriptionController.createInternetPlan)

router.get('/get-internet-plan', subscriptionController.getInternetPlan)

router.post('/add-subscription-plan',  TokenAuth.Auth, subscriptionController.addSubscripiontoUser)

router.post('/add-order',  TokenAuth.Auth, subscriptionController.addOrder)

router.post('/add-transaction',  TokenAuth.Auth, subscriptionController.addTransaction)

router.get('/get-order', subscriptionController.getOrder)

router.get('/get-transaction', subscriptionController.getTransaction)
module.exports = router;
