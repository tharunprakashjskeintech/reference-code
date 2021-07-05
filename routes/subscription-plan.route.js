var express = require('express');
const { authenticate } = require('../utils/authenticate');
const subscriptionController = require('../controllers/subscription-plan-controller ');
var router = express.Router();


router.post('/', subscriptionController.createPlan)

router.get('/', subscriptionController.getSubscriptionPlan)

router.post('/create-internet-plan', subscriptionController.createInternetPlan)

router.get('/get-internet-plan', subscriptionController.getInternetPlan)

module.exports = router;
