
const database = require("../utils/database")
const QueryGenerator = require("../generators/query.generator")

const uniqid = require('uniqid')


const UserModel = {
    async getLogin({email_id, password}) {
        return await database.promise().query(QueryGenerator.format(`select * from meety_users where email_id=? and password=?`,[email_id,password]))

    },

    async createUserProfile({role_id,email_id, phone_no, first_name,address,city,country,network_type,zip_code,
        network_name,security_type,security_password,router_picture,delivery_address,parent_id}) {
        let query;
        // Query generator can generate a insert query based on object we passed
        if(role_id == 2){
            query = QueryGenerator.insert("meety_users", {role_id,email_id, phone_no, first_name,address,city,country,network_connectivity:network_type,zip_code,password:uniqid.time()})

        }else{
            query = QueryGenerator.insert("meety_users", {role_id,email_id, phone_no, first_name,address,city,country,zip_code,parent_id,password:uniqid.time()});
            query += `;${QueryGenerator.insert(`meety_user_security_details`, { user_id: QueryGenerator.LAST_INSERTID, network_name,security_type,security_password,router_picture,delivery_address })}`
      
        }
        return await database.promise().query(query)

    },

    // async createUserProfile({role_id,email_id, phone_no, first_name,address,city,country,network_type,zip_code,
    //     }) {

    //     let query;
    //     query = QueryGenerator.insert("meety_users", {role_id,email_id, phone_no, first_name,address,city,country,zip_code,parent_id,password:uniqid.time()});
    //     query += `;${QueryGenerator.insert(`meety_user_security_details`, { user_id: QueryGenerator.LAST_INSERTID, network_name,security_type,security_password,router_picture,delivery_address })}`

    //     // Query generator can generate a insert query based on object we passed
    //     return await database.promise().query(query)
    // },
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

    async getAllDeatails({type}) {
        let query;
        if(type == "DASHBOARD"){
         query = QueryGenerator.format(`SELECT COUNT(*) as count , 'USER' as role
        FROM meety_users where role_id NOT IN (1);
        SELECT COUNT(*) as count , 'SUBSCRIPTIONS' as role
        FROM meety_user_parent_xref;
         SELECT COUNT(*) as count , 'DELIVERYORDERS' as role
        FROM meety_order_details WHERE status = 'DELIVERED';
         SELECT COUNT(*) as count , 'PENDINGORDERS' as role
        FROM meety_order_details WHERE status = 'PENDING';
         SELECT COUNT(*) as count , 'TRANSCATIONS' as role
        FROM meety_transactions;`)
        
    }
        return await database.promise().query(query)
    },
    async updateDeviceTokenById({
        id, device_token
    }) {

console.log(id,device_token)
        return await database.promise().query(QueryGenerator.format(`
        UPDATE meety_users SET fcm_token =  :device_token WHERE id = :id  `,
            {
                device_token,
                id

            }))


    },
}


module.exports = UserModel