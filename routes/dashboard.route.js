var express = require('express');
const { authenticate } = require('../utils/authenticate');
const dashboardController = require('../controllers/dashboard-controller');
var router = express.Router();
const TokenAuth = require('../utils/authenticate')


router.get('/',TokenAuth.Auth, dashboardController.getdashboard)


module.exports = router;
