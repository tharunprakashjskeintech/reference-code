
// 'use strict';
const nodemailer = require('nodemailer');
const generator = require('generate-password');
const QueryGenerator = require("../generators/query.generator")
const database = require("../utils/database");
const logger = require('./winston');
 const  User  = require("../user-management/dist/models/user");
const UserModel = require("../models/user.model");

    function sendMail(request, callback) {
        console.log("user_id ==> ",request);
    userMail = request.email_id;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sippergymapp@gmail.com',
            pass: 'Sipper@2021'
        }
    });

    var newPwd = generatePassword();
    console.log(" Otp Number ====> ",newPwd)
    var mailOptions = {
        from: 'sippergymapp@gmail.com', // sender address
        to: userMail, // list of receivers
        subject: 'Reset Password', // Subject line
        html: 'Your Otp is:' + newPwd // plain text body
    };

 
            transporter.sendMail(mailOptions, function(err, info) {
                if (err)
                    console.error("Error:**send email**", err);
                else
                query = QueryGenerator.insert(`sp_user_otps`,{email_id:userMail,otp:newPwd})

                return database.promise().query(query)

                    callback(null, info);
            });

};

// Gift card sent to mail

function giftCardMailSent(request, callback) {
    console.log("user_id ==> ",request);
    receiver_email_id = request.receiver_email_id;
    created_name = request.created_name;
    gift_card_id = request.gift_card_id
    gift_amount = request.gift_amount
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sippergymapp@gmail.com',
        pass: 'Sipper@2021'
    }
});

var mailOptions = {
    from: 'sippergymapp@gmail.com', // sender address
    to: receiver_email_id, // list of receivers
    subject: 'Gift Card', // Subject line
    html: 'Sender name:' + created_name + "Gift card coupon code " + gift_card_id
    + "Gift amount " + gift_amount // plain text body
};


        transporter.sendMail(mailOptions, function(err, info) {
            if (err)
                console.error("Error:**send email**", err);
            else
                callback(null, info);
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


// Welcome sent to mail

function welcomeMailSent(request, callback) {
    logger.info("welcome email"+JSON.stringify(request));
    console.log("user_id ==> ",request);
    receiver_email_id = request.receiver_email_id;
        logger.info("welcome email"+receiver_email_id);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sippergymapp@gmail.com',
        pass: 'Sipper@2021'
    }
});

var mailOptions = {
    from: 'sippergymapp@gmail.com', // sender address
    to: receiver_email_id, // list of receivers
    subject: 'Welcome to MySipper', // Subject line
    html: 'Welcome to MySipper. Thank you for registering' // plain text body
};


        transporter.sendMail(mailOptions, function(err, info) {
            if (err)
                console.error("Error:**send email**", err);
            else
                callback(null, info);
        });

};


//General sent to mail

async function generalMailSent(request, callback) {
    let receiver_email_id;
    let title="Welcome";
    let message="test message";

    if(request.email_id){
    receiver_email_id = request.email_id;
    }

    if(request.user_id){
user_id=request.user_id;
        let usr = await UserModel.getUsers({
                user_id
            })

    receiver_email_id = usr[0][0].email_id;
    }

    if(request.title){
        title=request.title;
    }

    if(request.message){
        message=request.message;
    }



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sippergymapp@gmail.com',
        pass: 'Sipper@2021'
    }
});

var mailOptions = {
    from: 'sippergymapp@gmail.com', // sender address
    to: receiver_email_id, // list of receivers
    subject: title, // Subject line
    html: message // plain text body
};


        transporter.sendMail(mailOptions, function(err, info) {
            if (err)
                console.error("Error:**send email**", err);
            else
                callback(null, info);
        });

};







module.exports = {sendMail,giftCardMailSent,welcomeMailSent,generalMailSent};
