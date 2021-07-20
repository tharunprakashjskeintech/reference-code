
var FCM = require('fcm-node');
const UserModel = require("../models/user.model");
// Sipper credentials
var serverKey = 'AAAATNnn9d4:APA91bEAxdFNgWiNiQ6m0uluvHqpy9BkNnpN1Qyv0Y6iBSwPGv6yTvoxBYu1PN8aEZO7yjU4p2i1DScjgliBxGq20-EfKeGq9v9TQuw6ZJBVzcdhihCtCl0sF-fXuNdOjgkw2uOrK2sZ';
var fcm = new FCM(serverKey);
const logger = require("../utils/winston")









async function sendNotification({ id,msg }) {
    let [getdeviceToken] = await UserModel.getDeviceToken({ id })
    if (getdeviceToken.length) {



        if (getdeviceToken[0].fcm_token != null) {
            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: getdeviceToken[0].fcm_token,
                notification: {
                    title: 'Meety App',
                    body: msg,
                    "click_action": "FCM_PLUGIN_ACTIVITY",
                },
                // "data": {
                //     "flag": "DISPATCH"  //Any data to be retrieved in the notification callback
                // }
            };
            fcm.send(message, function (err, response) {

                if (err) {
                    console.error("Something has gone wrong!", err);
                    console.log("Something has gone wrong!", err);
                    // callback("Error sending notification", null)
                    return "failure"
                } else {
                    console.log("Successfully sent with response: ", response);
                    //callback(null, "notification sent");
                    return "success"
                }
            });
        }

    }
}



module.exports = {  sendNotification };
