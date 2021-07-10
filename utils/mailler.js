
// 'use strict';
const nodemailer = require('nodemailer');
const QueryGenerator = require("../generators/query.generator")
const database = require("./database");
const logger = require('./winston');
const UserModel = require("../models/user.model");

    function sendMail(request, callback) {
    userMail = request.email_id;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'skeintechtest@gmail.com',
            pass: 'skein@123'
        }
    });
    var newPwd=generatePassword();
    var mailOptions = {
        from: 'skeintechtest@gmail.com', // sender address
        to: userMail, // list of receivers
        subject: 'Reset Password', // Subject line
        html: 'Your Otp is:' + newPwd // plain text body
    };

 
            transporter.sendMail(mailOptions, function(err, info) {
                if (err)
                    console.error("Error:**send email**", err);
                else

                var user= {email_id:userMail,otp:newPwd,is_verified:0};
                // query = QueryGenerator.insert(`otp_verification`,{email_id:userMail,otp:newPwd,isVerified:0})
                // return  await database.promise().query(query)
                return database.promise().query(QueryGenerator.insert("otp_verification", user))
                    // callback(null, info);
            });

};
function generatePassword() {
    var length = 5,
        charset = "0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}








module.exports = {sendMail};
