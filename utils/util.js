
var FCM = require('fcm-node');
const UserModel = require("../models/user.model");
// Sipper credentials
var serverKey = 'AAAATNnn9d4:APA91bEAxdFNgWiNiQ6m0uluvHqpy9BkNnpN1Qyv0Y6iBSwPGv6yTvoxBYu1PN8aEZO7yjU4p2i1DScjgliBxGq20-EfKeGq9v9TQuw6ZJBVzcdhihCtCl0sF-fXuNdOjgkw2uOrK2sZ';
var fcm = new FCM(serverKey);
const logger = require("../utils/winston")

var token ='eGIdEfmsT8SM9FCdDNodqK:APA91bFfyieffvASGKxx6Upy5A877zW8F-JJpG8hGqX48jGldc_RfVY0nwHlsCjoaF-N7FdRtp_iNpoY1ax3ANhxMbhE1MZFqD6kCHIZ6W_UTcp96CNuLYoG9ECWGLzULGV5P3N92wlY';

var token1= 'fdZZh_pRTuiKAcBTbe6SZW:APA91bH8QF9k8CQzaijzOUwpxrhnPO78432cE9bMKFA_M2Q4rWN6zMJnE8ImXyg2Tys8wxvfzR8e4Z-z9tXtGHl1ubVGIDKQgK_A-D0fujlQoWBMvbNv38XP9Wzon8FZPUd9opGQlIdT';





async function sendNotification({ id,msg }) {
    let [getdeviceToken] = await UserModel.getDeviceToken({ id })
   // if (getdeviceToken.length) {
       // if (getdeviceToken[0].fcm_token != null) {
            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: token1,//'getdeviceToken[0].fcm_token,
                notification: {
                    title: 'Meety App',
                    body: msg,
                    "click_action": "FCM_PLUGIN_ACTIVITY",
                },
                // "data": {
                //     "flag": "DISPATCH"  //Any data to be retrieved in the notification callback
                // }
            };
          await  fcm.send(message, function (err, response) {

                if (err) {
                    logger.info(err)
                   logger.info("Something has gone wrong!", err);
                    logger.info("Something has gone wrong!", err);
                    // callback("Error sending notification", null)
                    return "failure"
                } else {
                    logger.info("Successfully sent with response: ", response);
                    //callback(null, "notification sent");
                    return "success"
                }
            });
       // }

    //}
    return {"res":"success"}
}



module.exports = {  sendNotification };
