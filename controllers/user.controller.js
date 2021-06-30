var jwt = require('jsonwebtoken');
const logger = require("../utils/winston");
const UserModel = require("../models/user.model");
const SpErrorHandler = require("../utils/error-handler")
const { Message } = require("../utils/messages")
const Response = require("../utils/response")
const { Role } = require("../utils/roles");
const uniqid = require('uniqid')
const { StatusCodes } = require("http-status-codes");

const UserController = {

    async getLogin(req,res){
        let { email_id, password } = req.body
        try{
            let [login] = await UserModel.getLogin({email_id, password})
            console.log(login);
            if(login.length){
                new Response(
                    res,
                )._SuccessResponse(
                    Message.UserManagement.SuccessMessage.Login,login
                )
            }else{
                new Response(
                    res,
                    StatusCodes.BAD_REQUEST
                )._ErrorMessage(
                    Message.UserManagement.FailureMessage.Login,
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

async  createAdminUser(req, res) {

    let {role_id, email_id, phone_no, first_name,address,city,country,network_type,zip_code,network_name,security_type,security_password,router_picture,contacts,parent_id } = req.body
    try {
        if(Role.ADMIN_USER == role_id){
        let [profile_data] = await UserModel.createAdminUserProfile({role_id,email_id, phone_no, first_name,address,city,country,network_type,zip_code
        })
        profile_data = profile_data instanceof Array ? profile_data[0] : profile_data

        if(profile_data){

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
            
        }else if(Role.TABLET_USER == role_id){
            let [profile_data] = await UserModel.createUserProfile({role_id,email_id, phone_no, first_name,address,city,country,network_type,zip_code,network_name,security_type,security_password,router_picture,parent_id
            })
            profile_data = profile_data instanceof Array ? profile_data[0] : profile_data
            if(contacts){
           let membersdata = contacts.map(item=>{
                return {
                    first_name:item.first_name,
                    phone_no:item.phone_no,
                    email_id:item.email_id,
                    password:uniqid.time(),
                    parent_id:profile_data.insertId
                }
            })
            let [members1] = await UserModel.createmembers(membersdata)
        }
            if(profile_data){
    
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

        // id = null
        // if (req.user) {
        //     id = req.user.id
        // }

        /**
         * ANCHOR creating user ref to gym
         * 
         */
        let [changepassword] = await UserModel.changePasswordById({id,
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

}
module.exports = UserController