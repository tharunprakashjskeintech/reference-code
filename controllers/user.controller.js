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
const UserController = {
    /**
     * 
     * @param {'email_id', 'password'} req 
     * @param {*} res 
     */
    async getLogin(req, res) {
        let { email_id, password } = req.body
        try {
            let [login] = await UserModel.getLogin({ email_id, password })
            console.log(login[0])
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
                    StatusCodes.BAD_REQUEST
                )._ErrorMessage(
                    Message.UserManagement.FailureMessage.Login,
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

        let { role_id, email_id, phone_no, first_name,last_name, address, city, country, network_type, zip_code, network_name, security_type, security_password, router_picture, contacts, parent_id, delivery_address } = req.body
        try {
            if (Role.ADMIN_USER == role_id) {
                let [profile_data] = await UserModel.createUserProfile({
                    role_id, email_id, phone_no, first_name,last_name, address, city, country, network_type, zip_code
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
                        StatusCodes.BAD_REQUEST
                    )._ErrorMessage(
                        Message.UserManagement.FailureMessage.Create,
                    )

                }

            } else if (Role.TABLET_USER == role_id) {
                let [profile_data] = await UserModel.createUserProfile({
                    role_id, email_id, phone_no, first_name,last_name, address, city, country, network_type, zip_code, network_name, security_type, security_password, router_picture, delivery_address, parent_id
                })
                profile_data = profile_data instanceof Array ? profile_data[0] : profile_data
                if (contacts) {
                    let membersdata = contacts.map(item => {
                        return {
                            first_name: item.first_name,
                            last_name:item.last_name,
                            phone_no: item.phone_no,
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
                        StatusCodes.BAD_REQUEST
                    )._ErrorMessage(
                        Message.UserManagement.FailureMessage.Create,
                    )

                }
            }

        }
        catch (err) {


            console.log(err)

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

    async getTabletUsers(req,res){
        try{
            let [tabletUsers] = await UserModel.getTabletUsers();
            if(tabletUsers){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.SubscriptionManagement.SuccessMessage.Fetch,
                    tabletUsers
                )
            }else{
                new Response(
                    res,
                    StatusCodes.BAD_REQUEST
                )._ErrorMessage(
                    Message.SubscriptionManagement.FailureMessage.NotFound
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
                    Message.SubscriptionManagement.SuccessMessage.Fetch,
                    contactUsers
                )
            }else{
                new Response(
                    res,
                    StatusCodes.BAD_REQUEST
                )._ErrorMessage(
                    Message.SubscriptionManagement.FailureMessage.NotFound
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
            let {id,first_name, last_name,phone_no,email_id} = req.body;
            membersdata= {
                first_name: first_name,
                last_name:last_name,
                phone_no: phone_no,
                email_id: email_id,
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
                    StatusCodes.BAD_REQUEST
                )._ErrorMessage(
                    Message.UserManagement.FailureMessage.Create,
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
        let {role_id, email_id, phone_no, first_name,last_name, address, city, country, network_type, zip_code, network_name,
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
                role_id, email_id, phone_no, first_name,last_name, address, city, country,
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
            new AppErrorHandler(res, err)
        }
    },
}
module.exports = UserController