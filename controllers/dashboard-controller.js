var jwt = require('jsonwebtoken');
const logger = require("../utils/winston");
const DashboardModel = require("../models/dashboard.model");
const SpErrorHandler = require("../utils/error-handler")
const { Message } = require("../utils/messages")
const Response = require("../utils/response")
const { Role } = require("../utils/roles");
const uniqid = require('uniqid')
const { StatusCodes } = require("http-status-codes");

const dashboardController = {


    async getdashboard(req,res){
        let { id,role_id } = req.user
        try{
            let [dashboard] = await DashboardModel.getdashboard({id,role_id})

            if(dashboard){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.SubscriptionManagement.SuccessMessage.Fetch,dashboard
                )
            }else{
                new Response(
                    res,
                    StatusCodes.BAD_REQUEST
                )._ErrorMessage(
                    Message.SubscriptionManagement.FailureMessage.Create
                )
            
            }
        }catch(err){
            console.log(err)

            /**
             * ANCHOR user creation and machine creation error handler
             */
            new SpErrorHandler(res, err)
        }
    },

   

}
module.exports = dashboardController