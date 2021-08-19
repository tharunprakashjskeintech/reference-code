const logger = require("../utils/winston");
const ChatModel = require("../models/chat.model");
const SpErrorHandler = require("../utils/error-handler")
const { Message } = require("../utils/messages")
const Response = require("../utils/response")
const { Role } = require("../utils/roles");
const uniqid = require('uniqid')
const { StatusCodes } = require("http-status-codes");

const chatController={
    async createChatMessage(req,res){
        let {user_id,messages,admin_read,status,recipient_id} = req.body
        try{
            let [chatmessage] = await ChatModel.createChatMessage({user_id,messages,admin_read,status,recipient_id});
            if(chatmessage){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.ChatMessage.SuccessMessage.Create
                )
            }else{
                new Response(
                    res,
                    StatusCodes.OK
                )._ErrorMessage(
                    Message.ChatMessage.FailureMessage.Create
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
    async getChatMessage(req,res){
        try{
            let [getchatmessage] = await ChatModel.getChatMessages()
            if(getchatmessage){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.ChatMessage.SuccessMessage.Fetch,
                    getchatmessage
                )
            }else{
                new Response(
                    res,
                    StatusCodes.OK
                )._ErrorMessage(
                    Message.ChatMessage.FailureMessage.Create
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
    async deleteChatMessage(req,res){
        // getting request from query params
        let { id } = req.params
        console.log(id);
        try {
            let [deletechatmessage] = await ChatModel.findByIdAndDelete(id)
            if (deletechatmessage.affectedRows) {

                // sending success response to client
                new Response(res)._SuccessResponse(Message.Common.SuccessMessage.Deletion("Chat-Message"))

            }
            else {
                // failed response
                new Response(res, StatusCodes.OK)._ErrorMessage(Message.Common.FailureMessage.Deletion("Chat-Message"))

            }
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }

    },
    async updateChatMessage(req,res){
        //getting request from body
        let {user_id,messages,admin_read,status} = req.body;
        let { id } = req.params;
        console.log(req.body);
        try {
            let [chatdetails] = await ChatModel.findById(id,{user_id,messages,admin_read,status})
             // InternetPlanDetails updated successfully
            if (chatdetails.affectedRows) {

                // sending success response to client
                new Response(res)._SuccessResponse(Message.Common.SuccessMessage.Updation("Chat Message"))

            }
            else {
                // failed response
                new Response(res, StatusCodes.OK)._ErrorMessage(Message.Common.FailureMessage.Updation("Chat Message"),chatdetails)

            }
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }
    },
    async createChatMessageReplies(req,res){
        let {message_id,message_by,admin_read,messages,message_on,user_read} = req.body
        try{
            let [chatmessage] = await ChatModel.createChatMessageReplies({message_id,message_by,admin_read,messages,message_on,user_read});
            if(chatmessage){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.ChatMessage.SuccessMessage.Create
                )
            }else{
                new Response(
                    res,
                    StatusCodes.OK
                )._ErrorMessage(
                    Message.ChatMessage.FailureMessage.Create
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
    async getChatMessageReplies(req,res){
        try{
            let [getchatmessagereplies] = await ChatModel.getChatMessagesReplies()
            if(getchatmessagereplies){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.ChatMessage.SuccessMessage.Fetch,
                    getchatmessagereplies
                )
            }else{
                new Response(
                    res,
                    StatusCodes.OK
                )._ErrorMessage(
                    Message.ChatMessage.FailureMessage.Create
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
    async updateChatMessageReplies(req,res){
        //getting request from body
        let {message_id,message_by,admin_read,messages,message_on,user_read} = req.body;
        let { id } = req.params;
        console.log(req.body);
        try {
            let [chatreplydetails] = await ChatModel.findByIdAndUpdate(id,{message_id,message_by,admin_read,messages,message_on,user_read})
             // InternetPlanDetails updated successfully
            if (chatreplydetails.affectedRows) {

                // sending success response to client
                new Response(res)._SuccessResponse(Message.Common.SuccessMessage.Updation("Chat Repelis Message"))

            }
            else {
                // failed response
                new Response(res, StatusCodes.OK)._ErrorMessage(Message.Common.FailureMessage.Updation("Chat Repelis Message"),chatreplydetails)

            }
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }
    },
    async deleteChatMessageReplies(req,res){
        // getting request from query params
        let { id } = req.params
        console.log(id);
        try {
            let [deletechatmessagereplies] = await ChatModel.findByIdAndDeleteReplies(id)
            if (deletechatmessagereplies.affectedRows) {

                // sending success response to client
                new Response(res)._SuccessResponse(Message.Common.SuccessMessage.Deletion("Chat-Message-Replies"))

            }
            else {
                // failed response
                new Response(res, StatusCodes.OK)._ErrorMessage(Message.Common.FailureMessage.Deletion("Chat-Message-Replies"))

            }
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }

    },

    

}

module.exports=chatController;