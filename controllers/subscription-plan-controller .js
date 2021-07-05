var jwt = require('jsonwebtoken');
const logger = require("../utils/winston");
const SubscriptionModel = require("../models/subscription-plan.model");
const SpErrorHandler = require("../utils/error-handler")
const { Message } = require("../utils/messages")
const Response = require("../utils/response")
const { Role } = require("../utils/roles");
const uniqid = require('uniqid')
const { StatusCodes } = require("http-status-codes");

const subscriptionController = {

    async createPlan(req,res){
        let { s_plan_name, s_plan_duration,s_plan_price,s_plan_no_of_contacts,s_plan_call_duration } = req.body
        try{
            let [subscription] = await SubscriptionModel.createSubscriptionPlan({s_plan_name, s_plan_duration,s_plan_price,s_plan_no_of_contacts,s_plan_call_duration})
            if(subscription){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.SubscriptionManagement.SuccessMessage.Create
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

    async getSubscriptionPlan(req,res){
        try{
            let [getsubscription] = await SubscriptionModel.getSubscriptionPlan()
            if(getsubscription){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.SubscriptionManagement.SuccessMessage.Fetch
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

    async createInternetPlan(req,res){
        let { network_type, price,durationduration } = req.body
        try{
            let [subscription] = await SubscriptionModel.createInternetPlan({network_type, price,durationduration})
            if(subscription){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.SubscriptionManagement.SuccessMessage.Create
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

    async getInternetPlan(req,res){
        try{
            let [getsubscription] = await SubscriptionModel.getInternetPlan()
            if(getsubscription){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.SubscriptionManagement.SuccessMessage.Fetch
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
module.exports = subscriptionController