
 var express = require('express');
 const LocationController = require('../controllers/location-controller');
 const locationRouter = express.Router();
 
 
 
 /* ------------------------- get countries ------------------------- */
 locationRouter.get('/countries', LocationController.getCountries)
 
 /* ------------------------- get state ------------------------- */
 locationRouter.get('/states', LocationController.getStates)
 
 /* ------------------------- get City ------------------------- */
 locationRouter.get('/cities', LocationController.getCities)
 
/* ------------------------- get Codes ------------------------- */
locationRouter.get('/getCodes', LocationController.getZipcode)
 
 module.exports = locationRouter;
 