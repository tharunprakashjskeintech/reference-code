
const { Response } = require("./response");

var jwt = require('jsonwebtoken');
const database = require("./database");
const { StatusCodes } = require("http-status-codes");
const TokenController = require("../controllers/token.controller");





function Auth(req, res, next) {


        try {
<<<<<<< HEAD
            console.log("req.headers.access_token ---> ",req.headers);
            // console.log("req.cookies.access_token ---> ",req.cookies.access_token);
=======
            console.log("req.headers.access_token ---> ",req.headers.access_token);
            console.log("req.cookies.access_token ---> ",req.cookies.access_token);
>>>>>>> d51256b1a01d2e2b48eae8228c76911c7d501ee2

            console.log("req.headers.refresh_token ---> ",req.headers.refresh_token);
            console.log("req.cookies.refresh_toke ---> ",req.cookies.refresh_token);

            console.log(req.headers)
            let access_token  =  req.headers.access_token || req.cookies.access_token || null;
            let refresh_token = req.headers.refresh_token || req.cookies.refresh_token || null;
            // let access_token  =  req.headers.access_token;
            // let refresh_token = req.headers.refresh_token;
console.log("access_token ---> ",access_token);
console.log("refresh_token ---->",refresh_token)
            if(!access_token) {
                console.log("access_token not found...");
                res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized')
            }
            else if(!refresh_token) {
                console.log("refresh_token not found...");

                res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized')
            }
            else {
                let user = jwt.verify(access_token, process.env.JSON_WEB_TOKEN_SECRET , TokenController.options)

               if (user) {
                 
                database.promise().query('SELECT * FROM meety_user_refresh_tokens WHERE user_id = ? AND expires > NOW() AND revoked is null ' , [user.id]).then (([rfTokens]) => {

                    if(rfTokens.length) {
                        req.user = user
                        next()
                    }
                    else {
                        res.send({
                            status: false,
                            message: "Invalid token !",
                            
                        })
                    }
                })
        
               }
               else {
                res.send({
                    status: false,
                    message: "Invalid token !",
                    
                })
               }

          /*  if (user) {
                req.user = user
                if (req.user.provider == req.params.type) {
                    res.cookie('jwt', req.user.token)
                } else if (req.user.provider == 'firebase') {
                    res.cookie('firebase', req.user.token)
                }

                delete req.user.token

                console.log(user)

                const refreshTokens = await UserRefreshToken.findAll({ user: user.id });

                req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);

                next()
            } else {
                res.send({
                    status: false,
                    message: "Invalid token !",
                    error: err
                })
            }  */
            }
          
        }
        catch (err) {
            console.log("Unauthorized err...",err);
            res.send({
                status: false,
                message: "Unauthorized !",
                err : err
            })
        }


}



function Authorize(roles = []) {

    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }


    return [

        // authenticate JWT token and attach user to request object (req.user)
        // authorize based on user role
        (req, res, next) => {

            logger.info(roles.length && !roles.includes(req.user.role))
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).send({
                    status: false,
                    message: "You have no access to access this url !"
                })
            }

            next()
            // err


            // authentication and authorization successful
        }
    ];
}

 

module.exports = {
    Auth,
    Authorize
}
