var jwt = require('jsonwebtoken');
const logger = require("../utils/winston");
const UserModel = require("../models/user.model");
const SpErrorHandler = require("../utils/error-handler")
const { Message } = require("../utils/messages")
const Response = require("../utils/response")
const { Role } = require("../utils/roles");
const uniqid = require('uniqid')
const { StatusCodes } = require("http-status-codes");
const TokenController = require('./token.controller');
const moment = require('moment')
const mailer = require("../utils/mailler")
const notification = require("../utils/util")
const UserController = {
    /**
     * 
     * @param {'email_id', 'password'} req 
     * @param {*} res 
     */
    async getLogin(req, res) {
        let { email_id, password,device_token } = req.body
        try {
            let [userExist]=await UserModel.findEmail({
                email_id
            });
            if (userExist.length) {
            let [login] = await UserModel.getLogin({ email_id, password })
           
            if(login.length != 0){ 
            
            let user = {
                id: login[0].id,
                role_id: login[0].role_id,
                email_id: login[0].email_id,
            }

            let accessToken = await TokenController.generateJwtToken(user)

            let expires_at = moment.unix(jwt.decode(accessToken).exp)
            let refreshToken = await TokenController.generateRefreshToken(user, req.ip)
            if (login.length) {

                TokenController.setTokenCookie(res, { access_token: accessToken, refresh_token: refreshToken })
                await UserModel.updateDeviceTokenById({
                    id:user.id, device_token
                })
                if(login[0].role_id == 3){
                    let [security_details] = await UserModel.getSecurityDetailsById({
                        user_id:login[0].id
                })
                login[0].network_name = security_details[0].network_name
                login[0].security_type = security_details[0].security_type

                login[0].security_password = security_details[0].security_password

                login[0].router_picture = security_details[0].router_picture

            }
                new Response(
                    res,
                )._LoginResponse(login, {
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    expires_at
                })
            } else {
                new Response(
                    res,
                    StatusCodes.OK
                )._ErrorMessage(
                    Message.UserManagement.FailureMessage.Login,
                )

            }
        }else{
            new Response(
                res,
                StatusCodes.OK
            )._ErrorMessage(
               "Wrong Password, Please try again or click forget password to reset !"
            )
        }
    }else{
        new Response(
            res,
            StatusCodes.OK
        )._ErrorMessage(
            "Entered User not Registered please register now!"
        )
    }
        } catch (err) {
            console.log(err)

            /**
             * ANCHOR user creation and machine creation error handler
             */
            new SpErrorHandler(res, err)
        }
    },

    /**
     * Registration
     * @param {*} req 
     * @param {*} res 
     */
    async createUser(req, res) {

        let { role_id, email_id, phone_no, first_name,last_name,profile_pic, address, phone_code,state,city, country, network_type, zip_code, network_name, security_type, security_password, router_picture, contacts, parent_id, delivery_address } = req.body
        try {
            if (Role.ADMIN_USER == role_id) {
                let [profile_data] = await UserModel.createUserProfile({
                    role_id, email_id, phone_no, first_name,last_name,profile_pic, address,phone_code,state, city, country, network_type, zip_code
                })
                profile_data = profile_data instanceof Array ? profile_data[0] : profile_data

                if (profile_data) {

                    new Response(
                        res,
                    )._SuccessResponse(
                        Message.UserManagement.SuccessMessage.Create
                    )

                } else {
                    new Response(
                        res,
                        StatusCodes.OK
                    )._ErrorMessage(
                        Message.UserManagement.FailureMessage.Create,
                    )

                }

            } else if (Role.TABLET_USER == role_id) {
                let [profile_data] = await UserModel.createUserProfile({
                    role_id, email_id, phone_no, first_name,last_name,profile_pic, address,phone_code,state, city, country, network_type, zip_code, network_name, security_type, security_password, router_picture, delivery_address, parent_id
                })
                profile_data = profile_data instanceof Array ? profile_data[0] : profile_data
                if (contacts) {
                    let membersdata = contacts.map(item => {
                        return {
                            first_name: item.first_name,
                            last_name:item.last_name,
                            phone_no: item.phone_no,
                            phone_code: item.phone_code,
                            email_id: item.email_id,
                            password: uniqid.time(),
                            parent_id: profile_data.insertId,
                            role_id: 4
                        }
                    })
                    await UserModel.createmembers(membersdata)
                }
                if (profile_data) {

                    new Response(
                        res,
                    )._SuccessResponse(
                        Message.UserManagement.SuccessMessage.Create
                    )

                } else {
                    new Response(
                        res,
                        StatusCodes.OK
                    )._ErrorMessage(
                        Message.UserManagement.FailureMessage.Create,
                    )

                }
            }

        }
        catch (err) {


            console.log(err)
            if (err.code == 'ER_DUP_ENTRY'){
                new Response(
                    res,
                    StatusCodes.OK
                )._ErrorMessage(
                   "User already exist"
                )
             }
            /**
             * ANCHOR user creation and machine creation error handler
             */
            new SpErrorHandler(res, err)
        }
    },
    async changePassword(req, res) {
        try {

            let {
                id,
                password
            } = req.body
            /**
             * ANCHOR creating user ref to gym
             * 
             */

            // console.log("--- req.user--", req.user);

            //  let { id } = req.user
            let [changepassword] = await UserModel.changePasswordById({
                id,
                password
            })
            console.log("change password === > ", changepassword);
            if (changepassword.affectedRows) {
                new Response(
                    res,
                )._SuccessResponse(
                    Message.UserManagement.SuccessMessage.Password
                )
            }
            else {
                new Response(
                    res,
                    StatusCodes.NOT_FOUND
                )._ErrorMessage(
                    Message.UserManagement.FailureMessage.PasswordFailed
                )
            }
        }
        catch (err) {

            /**
             * Handling err response
             */
            new SpErrorHandler(res, err)
        }
    },
    async getAllDeatails(req,res){
        let { type } = req.body
        try{
            if(type == "DASHBOARD"){
                let [dashboard] = await UserModel.getAllDeatails({type})
                var merged = [].concat.apply([], dashboard);
            }else{
                let [dashboard] = await UserModel.getAllDeatails({type})
              var merged = dashboard;
            }
              

            if(merged){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.SubscriptionManagement.SuccessMessage.Fetch,merged
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


     
    async fetch(req,res){
        try{
            let{ id } =req.query;
            let [contactUsers] = await UserModel.getUser(id);
            if(contactUsers){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.UserManagement.SuccessMessage.Fetch,
                    contactUsers
                )
            }else{
                new Response(
                    res,
                    StatusCodes.OK
                )._ErrorMessage(
                    Message.UserManagement.FailureMessage.NotFound
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
    async getTabletUsers(req,res){
        try{
            let [tabletUsers] = await UserModel.getTabletUsers();
            if(tabletUsers){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.UserManagement.SuccessMessage.Fetch,
                    tabletUsers
                )
            }else{
                new Response(
                    res,
                    StatusCodes.OK
                )._ErrorMessage(
                    Message.UserManagement.FailureMessage.NotFound
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
    async getContactUsers(req,res){
        try{
            let{ id } =req.query;
            let [contactUsers] = await UserModel.getContactUsers(id);
            if(contactUsers){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.UserManagement.SuccessMessage.Fetch,
                    contactUsers
                )
            }else{
                new Response(
                    res,
                    StatusCodes.OK
                )._ErrorMessage(
                    Message.UserManagement.FailureMessage.NotFound
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
    async addContactUsers(req,res){
        try{
            // let{ id } =req.query;
            let {id,first_name, last_name,phone_no,phone_code,email_id,profile_pic} = req.body;
            membersdata= {
                first_name: first_name,
                last_name:last_name,
                phone_no: phone_no,
                phone_code:phone_code,
                email_id: email_id,
                profile_pic:profile_pic,
                password: uniqid.time(),
                parent_id: id,
                role_id: 4
            }
            let [contactUsers] = await UserModel.createmembers(membersdata)
            if(contactUsers){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.UserManagement.SuccessMessage.Create
                )
            }else{
                new Response(
                    res,
                    StatusCodes.OK
                )._ErrorMessage(
                    Message.UserManagement.FailureMessage.Create,
                )
            
            }
        }catch(err){
            console.log(err)
             if (err.code == 'ER_DUP_ENTRY'){
                new Response(
                    res,
                    StatusCodes.OK
                )._ErrorMessage(
                   "Contact already exist"
                )
             }
            /**
             * ANCHOR user creation and machine creation error handler
             */
            new SpErrorHandler(res, err)
        }
    },

       // delete
    /**
       * 
       * @param {*} req 
       * @param {*} res 
       */
     async delete(req, res) {

        // getting request from query params
        let { id } = req.params
        try {


            let [deletecustomer] = await UserModel.findByIdAndDelete(id)




            if (deletecustomer.affectedRows) {

                // sending success response to client
                new Response(res)._SuccessResponse(Message.Common.SuccessMessage.Deletion("User"))

            }
            else {
                // failed response
                new Response(res, StatusCodes.OK)._ErrorMessage(Message.Common.FailureMessage.Deletion("User"))

            }
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }
    },

    
    // update
    /**
           * 
           * @param {*} req 
           * @param {*} res 
           */
     async update(req, res) {

        // getting request from body
        let {role_id, email_id, phone_no, first_name,last_name, profile_pic,address,phone_code,state, city, country, network_type, zip_code, network_name,
             security_type, security_password, router_picture, contacts, parent_id, delivery_address,auto_answer,auto_answer_time} = req.body;
        let { id } = req.params;
        console.log(req.body);
        try {


        
            // if (user_img) {
            //     let [users] = await UserModel.find({
            //         user_id
            //     })
            //     console.log("users ===>",users);
            //     if (users.length && users[0].user_img) {
            //         users.forEach(async item => {
            //             let path = `${process.env.APP_BASE_PATH}public/uploads/${item.user_img}`
            //             try {
            //                 fs.unlink(path)
            //                 console.log(`DELETED ${path}`)
            //             }
            //             catch (err) {
            //                 console.log(err)
            //             }
            //         })
            //     }
            // }
            // else {
            //     user_img = null
            // }

            let [userdetails] = await UserModel.findByIdAndUpdate(id,{
                role_id, email_id, phone_no, first_name,last_name,profile_pic,phone_code,state, address, city, country,
                 network_type, zip_code, network_name, security_type, security_password, router_picture, contacts, parent_id, delivery_address,auto_answer,auto_answer_time}
            )




            // CustomerDetails updatedted successfully
            if (userdetails.affectedRows) {

                // sending success response to client
                new Response(res)._SuccessResponse(Message.Common.SuccessMessage.Updation("User"))

            }
            else {
                // failed response
                new Response(res, StatusCodes.OK)._ErrorMessage(Message.Common.FailureMessage.Updation("User"),userdetails)

            }
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }
    },
      //Forgot Password
      async forgotPassword(req, res) {

        // getting request from body
        let { email_id } = req.body;
        
        try {
           let [userdetails] = await UserModel.findEmail({
                    email_id
                })
               
     
            if(userdetails.length) {
                console.log("users ===>",userdetails);
                mailer.sendMail({"email_id":email_id,"OTP":'Y'});
                // console.log(isSent);
                // if(isSent){
                    
                    // sending success response to client
                    new Response(res)._SuccessResponse(Message.Common.SuccessMessage.EmailSent)
                    
                // }else{
                //     new Response(res, StatusCodes.OK)._ErrorMessage(Message.Common.FailureMessage.EmailSent) 
                // }
               
            }
            else {
                // failed response
                new Response(res, StatusCodes.OK)._ErrorMessage("Entered Email id is not registered, Please try again!")

            }
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }
    },
    async validateOTP(req,res){

        // getting request from body
        let { email_id,otp } = req.body;
        // let { user_id } = req.params;
        console.log(req.body);
        try {
           let [validateOTP] = await UserModel.validateOTP({
                    email_id,otp
                })
               
                 console.log("users ===>",validateOTP);
            if(validateOTP.length){
                
                let isVerified=1;
                 await UserModel.UpdateStatus(
                    email_id,otp,isVerified
                )
                    new Response(res, StatusCodes.OK)._SuccessResponse("Success") 
                
               
            }
            else {
                // failed response
                new Response(res, StatusCodes.OK)._ErrorMessage("Invalid OTP")

            }
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }
    },

    async sendNotificaion(req,res){

        // getting request from body
        let { id,msg } = req.body;
        // let { user_id } = req.params;
        console.log(req.body);
        try {
           let [validateOTP] = await notification.sendNotification({
            id,msg
             
        })
               
            if(validateOTP.length){
                
                let isVerified=1;
                 await UserModel.UpdateStatus(
                    email_id,otp,isVerified
                )
                    new Response(res, StatusCodes.OK)._SuccessResponse("Success") 
                
               
            }
            else {
                // failed response
                new Response(res, StatusCodes.OK)._ErrorMessage("Invalid OTP")

            }
        }
        catch (err) {
            new SpErrorHandler(res, err)
        }
    },
   
}
module.exports = UserController