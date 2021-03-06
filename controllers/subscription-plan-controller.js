var jwt = require('jsonwebtoken');
const logger = require("../utils/winston");
const SubscriptionModel = require("../models/subscription-plan.model");
const SpErrorHandler = require("../utils/error-handler")
const { Message } = require("../utils/messages")
const Response = require("../utils/response")
const { Role } = require("../utils/roles");
const uniqid = require('uniqid')
const { StatusCodes } = require("http-status-codes");
const database = require("../utils/database");


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
                    StatusCodes.OK
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
async addOrder(req,res){
    let { user_id,payment_type,total_amount,trx_id,status,subscription_id} = req.body;
    try{
var date = new Date();
        date = date.toISOString().slice(0,10)
        let [subscription] = await SubscriptionModel.addOrder({user_id,payment_type,total_amount,trx_id,status,subscription_id,date})
        if(subscription){
            new Response(
                res,
            )._SuccessResponse(
                Message.OrderManagement.SuccessMessage.Create
            )
        }else{
            new Response(
                res,
                StatusCodes.OK
            )._ErrorMessage(
                Message.OrderManagement.FailureMessage.Create
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
async addTransaction(req,res){
    let {user_id,payment_type,amount,gateway,status,payment_gateway_trx_id,payment_gateway_response,payment_gateway_callback_response,date} = req.body;
    try{
        let [subscription] = await SubscriptionModel.addTransaction({user_id,payment_type,amount,gateway,status,payment_gateway_trx_id,payment_gateway_response,payment_gateway_callback_response,date})
        if(subscription){
            new Response(
                res,
            )._SuccessResponse(
                Message.TransactionManagement.SuccessMessage.Create
            )
        }else{
            new Response(
                res,
                StatusCodes.OK
            )._ErrorMessage(
                Message.TransactionManagement.FailureMessage.Create
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
async getOrder(req,res){
    try{
        let [getsubscription] = await SubscriptionModel.getOrder()
        if(getsubscription){
            new Response(
                res,
            )._SuccessResponse(
                Message.OrderManagement.SuccessMessage.Fetch,
                getsubscription
            )
        }else{
            new Response(
                res,
                StatusCodes.OK
            )._ErrorMessage(
                Message.OrderManagement.FailureMessage.Create
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
async getTransaction(req,res){
    try{
        let [getsubscription] = await SubscriptionModel.getTransaction()
        if(getsubscription){
            new Response(
                res,
            )._SuccessResponse(
                Message.TransactionManagement.SuccessMessage.Fetch,
                getsubscription
            )
        }else{
            new Response(
                res,
                StatusCodes.OK
            )._ErrorMessage(
                Message.TransactionManagement.FailureMessage.Create
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
                    Message.SubscriptionManagement.SuccessMessage.Fetch,
                    getsubscription
                )
            }else{
                new Response(
                    res,
                    StatusCodes.OK
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
        let { network_type, price,duration } = req.body
        try{
            let [subscription] = await SubscriptionModel.createInternetPlan({network_type, price,duration})
            if(subscription){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.SubscriptionManagement.SuccessMessage.Create
                )
            }else{
                new Response(
                    res,
                    StatusCodes.OK
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
                    Message.SubscriptionManagement.SuccessMessage.Fetch,
                    getsubscription
                )
            }else{
                new Response(
                    res,
                    StatusCodes.OK
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
    async addSubscripiontoUser(req,res){
        console.log(req)
        let { tablet_id, subscription_id,internet_plan_id } = req.body;
        // let {id}=req.user;
        try{
            let [subscription] = await SubscriptionModel.addSubscripiontoUser({tablet_id, subscription_id,internet_plan_id})
            if(subscription){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.SubscriptionManagement.SuccessMessage.Create
                )
            }else{
                new Response(
                    res,
                    StatusCodes.OK
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
    /*async deleteSubcriptionPlan(req,res){
        await 

    }*/
    async deleteSubcriptionPlan(req, res) {

        // getting request from query params
        let { id } = req.params
        console.log(id);
        try {


            let [deletesubscriptionplan] = await SubscriptionModel.findByIdAndDelete(id)




            if (deletesubscriptionplan.affectedRows) {

                // sending success response to client
                new Response(res)._SuccessResponse(Message.Common.SuccessMessage.Deletion("Subscription-Plan"))

            }
            else {
                // failed response
                new Response(res, StatusCodes.OK)._ErrorMessage(Message.Common.FailureMessage.Deletion("Subscription-Plan"))

            }
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }
    },
    async deleteInternetPlan(req, res) {

        // getting request from query params
        let { id } = req.params
        console.log(id);
        try {


            let [deleteinternetplan] = await SubscriptionModel.findByIdAndDeleteInternetPlan(id)




            if (deleteinternetplan.affectedRows) {

                // sending success response to client
                new Response(res)._SuccessResponse(Message.Common.SuccessMessage.Deletion("Internet-Plan"))

            }
            else {
                // failed response
                new Response(res, StatusCodes.OK)._ErrorMessage(Message.Common.FailureMessage.Deletion("Internet-Plan"))

            }
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }
    },
    async subscriptionPlanUpdate(req, res) {

        // getting request from body
        let {s_plan_name,s_plan_duration,s_plan_price,s_plan_no_of_contacts,s_plan_call_duration} = req.body;
        let { id } = req.params;
        //console.log(req.body);
        try {
            let [subscriptiondetails] = await SubscriptionModel.findByIdAndUpdate(id,{s_plan_name,s_plan_duration,s_plan_price,s_plan_no_of_contacts,s_plan_call_duration})
             // SubscriptionPlanDetails updated successfully
            if (subscriptiondetails.affectedRows) {

                // sending success response to client
                new Response(res)._SuccessResponse(Message.Common.SuccessMessage.Updation("subscription"))

            }
            else {
                // failed response
                new Response(res, StatusCodes.OK)._ErrorMessage(Message.Common.FailureMessage.Updation("subscription"),subscriptiondetails)

            }
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }
    },
    /*async subscriptionPlanUpdate(req, res) {

        // getting request from body
        let {s_plan_name,s_plan_duration,s_plan_price,s_plan_no_of_contacts,s_plan_call_duration} = req.body;
        let { id } = req.params;
        console.log(req.body);
        
        database.query('update meety_subscription_plan set s_plan_name=?,s_plan_duration=?,s_plan_price=?,s_plan_no_of_contacts=?,s_plan_call_duration=? where id=?',[s_plan_name,s_plan_duration,s_plan_price,s_plan_no_of_contacts,s_plan_call_duration,id],function(err,rows,fields){
            if(!err)
            res.send('subscription plan is updated');
            else
            res.send('subscription plan update is failed');
        });
    },
    async internetPlanUpdate(req, res) {

        // getting request from body
        let {s_plan_name,s_plan_duration,s_plan_price,s_plan_no_of_contacts,s_plan_call_duration} = req.body;
        let { id } = req.params;
        console.log(req.body);
        
        database.query('update meety_subscription_plan set s_plan_name=?,s_plan_duration=?,s_plan_price=?,s_plan_no_of_contacts=?,s_plan_call_duration=? where id=?',[s_plan_name,s_plan_duration,s_plan_price,s_plan_no_of_contacts,s_plan_call_duration,id],function(err,rows,fields){
            if(!err)
            res.send('subscription plan is updated');
            else
            res.send('subscription plan update is failed');
        });
    }*/
    async internetPlanUpdate(req, res) {

        // getting request from body
        let {network_type,price,duration} = req.body;
        let { id } = req.params;
        console.log(req.body);
        try {
            let [internetdetails] = await SubscriptionModel.findById(id,{network_type,price,duration})
             // InternetPlanDetails updated successfully
            if (internetdetails.affectedRows) {

                // sending success response to client
                new Response(res)._SuccessResponse(Message.Common.SuccessMessage.Updation("internetplan"))

            }
            else {
                // failed response
                new Response(res, StatusCodes.OK)._ErrorMessage(Message.Common.FailureMessage.Updation("internetplan"),internetdetails)

            }
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }
    },
}
module.exports = subscriptionController
