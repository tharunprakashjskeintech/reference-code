
// 'use strict';
const nodemailer = require('nodemailer');
const generator = require('generate-password');
const QueryGenerator = require("../generators/query.generator")
const database = require("../utils/database");
const logger = require('./winston');
const UserModel = require("../models/user.model");

    function sendMail(request, callback) {
    userMail = request.email_id;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
        }
    });

    var mailOptions = {
        from: '', // sender address
        to: userMail, // list of receivers
        subject: 'Reset Password', // Subject line
        html: 'Your Otp is:' + newPwd // plain text body
    };

 
            transporter.sendMail(mailOptions, function(err, info) {
                if (err)
                    console.error("Error:**send email**", err);
                else


                    callback(null, info);
            });

};









module.exports = {sendMail};
