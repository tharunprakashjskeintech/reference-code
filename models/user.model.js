
const database = require("../utils/database")
const QueryGenerator = require("../generators/query.generator")
const { Message } = require("../utils/messages")

const uniqid = require('uniqid')


const UserModel = {
    async getLogin({email_id, password}) {
        return await database.promise().query(QueryGenerator.format(`select * from meety_users where email_id=? and password=?`,[email_id,password]))

    },

    async createAdminUserProfile({role_id,email_id, phone_no, first_name,address,city,country,network_type,zip_code}) {
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.insert("meety_users", {role_id,email_id, phone_no, first_name,address,city,country,network_connectivity:network_type,zip_code,password:uniqid.time()})
        // console.log("insert id ",QueryGenerator.LAST_INSERTID)
        return await database.promise().query(query)

    },

    async createUserProfile({role_id,email_id, phone_no, first_name,address,city,country,network_type,zip_code,
        network_name,security_type,security_password,router_picture,delivery_address,parent_id}) {

        let query;
        query = QueryGenerator.insert("meety_users", {role_id,email_id, phone_no, first_name,address,city,country,zip_code,parent_id,password:uniqid.time()});
        console.log("insert id ",QueryGenerator.LAST_INSERTID);
        query += `;${QueryGenerator.insert(`meety_user_security_details`, { user_id: QueryGenerator.LAST_INSERTID, network_name,security_type,security_password,router_picture,delivery_address })}`

        // Query generator can generate a insert query based on object we passed
        return await database.promise().query(query)
    },
    async createmembers(membersdata) {

        let query;
        
        query = QueryGenerator.insert(`meety_users`, membersdata)
        // Query generator can generate a insert query based on object we passed
        return await database.promise().query(query)
    },
    async changePasswordById({ id, password }) {
        let query = QueryGenerator.format(
            `UPDATE meety_users SET meety_users.password  = ?,meety_users.login_status = 'COMPLETED'
           WHERE id = ?`, [password, id]
        )

        return await database.promise().query(
            query
        )
    },
}


module.exports = UserModel