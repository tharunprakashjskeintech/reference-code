const QueryGenerator = require("../generators/query.generator");
const database = require("../utils/database");
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const moment = require('moment')

const TokenController = {
    async getRefreshToken(token) {
        // let refreshToken = await UserRefreshToken.findOne({ where: { token } });
        let [refreshToken] = await database.promise().query(`SELECT * FROM meety_user_refresh_tokens WHERE token = ?`, token)

        refreshToken = refreshToken[0]

        if (!refreshToken || refreshToken.revoked || moment(refreshToken.expires).isBefore(new Date())) throw 'Invalid token';
        return refreshToken;
    },
    randomTokenString() {
        return crypto.randomBytes(40).toString('hex');
    },
    generateJwtToken(user) {
        // create a jwt token containing the user id that expires in 15 minutes
        return jwt.sign(user, process.env.JSON_WEB_TOKEN_SECRET, this.options);
    },


    async refreshToken({ token, ipAddress }) {

        const refreshToken = await this.getRefreshToken(token);
        let [user_row] = await database.promise().query(`SELECT * FROM meety_users WHERE id = ?`, [refreshToken.user_id])


        let user = {
            id: user_row[0].id,
            role_id: user_row[0].role_id,
            email_id: user_row[0].email_id,
            phone_no:user_row[0].phone_no,
            address:user_row[0].address,
            city:user_row[0].city,
            country:user_row[0].country,
            network_connectivity:user_row[0].network_connectivity,
            zip_code:user_row[0].zip_code,
            login_status:user_row[0].login_status
        }

        console.log(user)
        // replace old refresh token with a new one and save
        delete user.iat;
        delete user.exp
        delete user.iss

        const newRefreshToken = await this.generateRefreshToken(user, ipAddress);
        refreshToken.revoked = moment().format('YYYY-MM-DD HH:mm:ss');
        refreshToken.revokedByIp = ipAddress;
        refreshToken.replacedByToken = newRefreshToken.token;
        delete refreshToken.id
        delete refreshToken.token
        delete refreshToken.user_id
        delete refreshToken.createdAt
        delete refreshToken.expires
        await database.promise().query(QueryGenerator.update('meety_user_refresh_tokens', refreshToken, { token }));

        // generate new jwt
        let access_token = this.generateJwtToken(user);


        // return basic details and tokens
        return {
            ...{
                data: user
            },
            access_token,
            refresh_token: newRefreshToken
        };
    },
    async generateRefreshToken(user, ipAddress) {
        // create a refresh token that expires in 7 days

        let refreshToken = this.randomTokenString()

        let refresh = {
            user_id: user.id,
            token: refreshToken,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            createdByIp: ipAddress
        }

        await database.promise().query(QueryGenerator.insert('meety_user_refresh_tokens', refresh))

        return refreshToken
    },

    setTokenCookie(res, { access_token,
        refresh_token }) {
        // create http only cookie with refresh token that expires in 10 mins
        const cookieOptions = {
            httpOnly: true,
            expires: new Date(moment().add(10, 'days'))
        };
        res.cookie('refresh_token', refresh_token, cookieOptions);
        res.cookie('access_token', access_token, cookieOptions);

    },
    options: {
        expiresIn: "10m", issuer: "https://www.skeintech.com"
    },
    async refreshAccessToken(req, res, next) {
        try {
            console.log("headers token ",req.headers);
            // console.log("req ------> ",req);
            let token = req.headers.refresh_token || req.cookies.refresh_token || req.body.refresh_token || null
    
            console.log("Token to refresh", token)
            let data = await TokenController.refreshToken({ token, ipAddress: req.ip })
    
            data.expires_at = moment.unix(jwt.decode(data.access_token).exp)
            TokenController.setTokenCookie(res, { access_token: data.token, refresh_token: data.refresh_token })
            if (data) {
                res.send({
                    ...{
                        status: true,
                    },
                    ...data
                })
            }
            else {
                res.send({
                    status: false,
                    message: "Unauthorized token"
                })
            }
        }
        catch (err) {
            console.log(err)
            res.send({
                status: false,
                message: "Unauthorized token"
            })
        }
    }

}


module.exports = TokenController
