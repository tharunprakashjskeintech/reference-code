
const database = require("../utils/database")
const QueryGenerator = require("../generators/query.generator")

const uniqid = require('uniqid')


const UserModel = {
    async getLogin({email_id, password}) {
        return await database.promise().query(QueryGenerator.format(`select * from meety_users where email_id=? and password=?`,[email_id,password]))

    },

    async findEmail({email_id}){
        query = `SELECT * FROM meety_users WHERE email_id= '${email_id}'`
                

   // Query generator can generate a insert query based on object we passed

   return await database.promise().query(QueryGenerator.format(query, {email_id}))
            
    },
    async createUserProfile({role_id,email_id, phone_no, first_name,last_name,profile_pic,address,city,state, phone_code,country,network_type,zip_code,
        network_name,security_type,security_password,router_picture,delivery_address,parent_id}) {
        let query;
        // Query generator can generate a insert query based on object we passed
        if(role_id == 2){
            query = QueryGenerator.insert("meety_users", {role_id,email_id, phone_no, first_name,last_name,profile_pic,address,city,state, phone_code,country,network_connectivity:network_type,zip_code,password:uniqid.time()})

        }else{
            query = QueryGenerator.insert("meety_users", {role_id,email_id, phone_no, first_name,last_name,profile_pic,address,city,state, phone_code,country,zip_code,parent_id,password:uniqid.time()});
            query += `;${QueryGenerator.insert(`meety_user_security_details`, { user_id: QueryGenerator.LAST_INSERTID, network_name,security_type,security_password,router_picture,delivery_address })}`
      
        }
        return await database.promise().query(query)

    },
    async getUser(id){
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.format(`select * 
        from meety_users
        where meety_users.id=${id}`)
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
    async changePasswordById({ email_id, password }) {
        let query = QueryGenerator.format(
            `UPDATE meety_users SET meety_users.password  = ?,meety_users.login_status = 'COMPLETED'
           WHERE email_id = ?`, [password, email_id]
        )

        return await database.promise().query(
            query
        )
    },
       async getContactUsers(id){
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.format(`select * ,
        (select role_type from meety_roles where meety_roles.id = meety_users.role_id ) as role
        from meety_users
        where meety_users.parent_id=${id}`)
        return await database.promise().query(query)
    },
    async getTabletUsers(){
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.format(`select *, u.id as tablet_id,xref.subscription_id,xref.internet_plan_id,
        i.network_type,i.price as internet_price,i.duration as internet_duration, 
        s.s_plan_name,s.s_plan_duration,(s.s_plan_price+i.price) as s_plan_price,
        s.s_plan_no_of_contacts,s.s_plan_call_duration,u.first_name,sec.network_name
        from meety_users u
        left join meety_user_parent_xref xref 
        on xref.tablet_id = u.id
        left join meety_subscription_plan s 
        on xref.subscription_id = s.id
        left join meety_internet_connectivity_plan i 
        on xref.internet_plan_id = i.id
        left join meety_user_security_details sec 
        on u.id= sec.user_id where u.role_id = 3 group by u.id`)
        return await database.promise().query(query)
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
    else if(type == "USERS"){
    
        query = QueryGenerator.format(`SELECT *
        FROM meety_users where role_id = 2 `)

     }else if(type == "ORDERS"){
        query = QueryGenerator.format(`SELECT meety_order_details.*,usr.first_name,plan.s_plan_name,plan.s_plan_duration,plan.s_plan_price,plan.s_plan_no_of_contacts,plan.s_plan_call_duration
        FROM meety_order_details
 join meety_users as usr on usr.id = meety_order_details.user_id
join meety_subscription_plan as plan on plan.id= meety_order_details.subscription_id`)
     }else if(type == "TRANSCATIONS"){
        query = QueryGenerator.format(`SELECT *
        FROM meety_transactions `)
     }else if(type == "SUBSCRIPTIONS"){
        query = QueryGenerator.format(`SELECT *
        FROM meety_subscription_plan `)
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
     //update 

  async findByIdAndUpdate(id, user) {

    let query = QueryGenerator.update('meety_users', user, { id: id })

    return await database.promise().query(query)

  },

  //Forgot Password
  async findEmail(
    { email_id }
  ) {


    /* ------------------------ Setting initial variables ----------------------- */

    query = `SELECT * FROM meety_users WHERE email_id= '${email_id}'`
                 

    // Query generator can generate a insert query based on object we passed

    return await database.promise().query(QueryGenerator.format(query, {email_id}))
                 
  },
  /* --------------------------- Get Customer ends here -------------------------- */
  
  async validateOTP(
    { email_id,otp }
  ) {

    /* ------------------------ Setting initial variables ----------------------- */

    query = `SELECT email_id,otp,is_verified FROM otp_verification WHERE email_id= '${email_id}' AND otp=${otp}`
                 

    // Query generator can generate a insert query based on object we passed

    return await database.promise().query(QueryGenerator.format(query, {email_id,otp}))
                 
  },
   // update
   async UpdateStatus(email_id,otp, is_verified) {

    let query = QueryGenerator.update('otp_verification', {email_id,otp, is_verified}, { email_id: email_id })

    return await database.promise().query(query)

  },
    // delete
    async findByIdAndDelete(id) {

        let query = QueryGenerator.format(`DELETE FROM meety_users where id =? `, [id])
    
        return await database.promise().query(query)
    
      },
}


module.exports = UserModel