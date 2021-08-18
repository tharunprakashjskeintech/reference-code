var express = require('express');
const { authenticate } = require('../utils/authenticate');
const subscriptionController = require('../controllers/subscription-plan-controller');
var router = express.Router();
const TokenAuth = require('../utils/authenticate')

router.post('/', subscriptionController.createPlan)

router.get('/', subscriptionController.getSubscriptionPlan)

router.post('/create-internet-plan', subscriptionController.createInternetPlan)

router.get('/get-internet-plan', subscriptionController.getInternetPlan)

router.post('/add-subscription-plan', subscriptionController.addSubscripiontoUser)

router.post('/add-order',   subscriptionController.addOrder)

router.post('/add-transaction',subscriptionController.addTransaction)

router.get('/get-order', subscriptionController.getOrder)

router.get('/get-transaction', subscriptionController.getTransaction)

router.delete('/delete-internet-plan',subscriptionController.deleteInternetPlan)

router.delete('/delete-subscription-plan/:id',subscriptionController.deleteSubcriptionPlan)

router.put('/update-subscription-plan/:id',subscriptionController.subscriptionPlanUpdate)

router.put('/update-internet-plan/:id',subscriptionController.internetPlanUpdate)

module.exports = router;
