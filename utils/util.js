
var FCM = require('fcm-node');
const UserModel = require("../models/user.model");
// Sipper credentials
var serverKey = 'AAAATNnn9d4:APA91bEAxdFNgWiNiQ6m0uluvHqpy9BkNnpN1Qyv0Y6iBSwPGv6yTvoxBYu1PN8aEZO7yjU4p2i1DScjgliBxGq20-EfKeGq9v9TQuw6ZJBVzcdhihCtCl0sF-fXuNdOjgkw2uOrK2sZ';
// var serverKey = 'AAAAtS6iW8s:APA91bE5lj_HixLIaZzkzFHiHSyRj8B9n7La19BSnsDuBwirgTZdqEgWlGOgSqC86NcLvoNnkCBGCJotMOPq_yR6nxFrJ2JbHCq8kiSKg5RFCdpB2_bjsnKZFqNWlemMBliXAg3fq2iU'; //put your server key here
var fcm = new FCM(serverKey);
const logger = require("../utils/winston")


async function orderDispatchNotification({ user_id }) {
    console.log("user_id ===>", user_id)
    logger.info("/user_id/" + user_id);
    let [getdeviceToken] = await UserModel.getDeviceToken({ user_id })
    console.log("===========>>>", getdeviceToken[0]);
    logger.info("/Notification token/" + getdeviceToken[0]);
    if (getdeviceToken.length) {
        logger.info("/Notification length check /" + JSON.stringify(getdeviceToken[0]));

        if (getdeviceToken[0].token != null) {
            logger.info("/Notification uid check/" + JSON.stringify(getdeviceToken[0].firebase_uid));
            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: getdeviceToken[0].token,
                notification: {
                    title: 'Sipper App',
                    body: "Order dispatched successfully",
                    "click_action": "FCM_PLUGIN_ACTIVITY",
                },
                "data": {
                    "flag": "DISPATCH"  //Any data to be retrieved in the notification callback
                }
            };
            console.log("message ---", message);
            fcm.send(message, function (err, response) {
                if (err) {
                    console.error("Something has gone wrong!", err);
                    console.log("Something has gone wrong!", err);
                    // callback("Error sending notification", null)
                    logger.info("/Notification error/" + err);
                    return "failure"
                } else {
                    console.log("Successfully sent with response: ", response);
                    //callback(null, "notification sent");
                    logger.info("/Notification success/" + response);
                    return "success"
                }
            });
        }

    }

}







async function sendNotification({ user_id, body }) {
    let [getdeviceToken] = await UserModel.getDeviceToken({ user_id })
    if (getdeviceToken.length) {



        if (getdeviceToken[0].token != null) {
            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: getdeviceToken[0].token,
                notification: {
                    title: 'Sipper App',
                    body: body,
                    "click_action": "FCM_PLUGIN_ACTIVITY",
                },
                "data": {
                    "flag": "DISPATCH"  //Any data to be retrieved in the notification callback
                }
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



async function sendMessage({ role_id, user_id,title,msg }) {

    let cond = []
    if (role_id) {
      cond.push(`role_id=:role_id`)
    }
    if (user_id) {
      cond.push(`user_id=:user_id`)
    }
   
    cond = cond.length ? `WHERE ${cond.join(' AND ')}` : ''

   
query = `SELECT * FROM sipper_app.sp_users
  ${cond};`
    return await database.promise().query(QueryGenerator.format(query, {
      role_id: role_id,
      user_id
    })
    )
  }


module.exports = { orderDispatchNotification, sendNotification,sendMessage };
