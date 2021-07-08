
const database = require("../utils/database")
const QueryGenerator = require("../generators/query.generator")


const SubscriptionModel = {
   async createSubscriptionPlan({s_plan_name, s_plan_duration,s_plan_price,s_plan_no_of_contacts,s_plan_call_duration}) {
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.insert("meety_subscription_plan", {s_plan_name, s_plan_duration,s_plan_price,s_plan_no_of_contacts,s_plan_call_duration})
        return await database.promise().query(query)

    },
    async addOrder({user_id,payment_type,total_amount,trx_id,status,subscription_id,date}) {
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.insert("meety_order_details", {user_id,payment_type,total_amount,trx_id,status,subscription_id,date})
        return await database.promise().query(query)

    },
    async addTransaction({user_id,payment_type,amount,gateway,status,payment_gateway_trx_id,payment_gateway_response,payment_gateway_callback_response,date}) {
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.insert("meety_transactions", {user_id,payment_type,amount,gateway,status,payment_gateway_trx_id,payment_gateway_response,payment_gateway_callback_response,date})
        return await database.promise().query(query)

    },
    async getOrder() {
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.format("select * from meety_order_details")
        return await database.promise().query(query)

    },
    async getTransaction() {
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.format("select * from meety_transactions")
        return await database.promise().query(query)

    },
    async getSubscriptionPlan() {
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.format("select * from meety_subscription_plan")
        return await database.promise().query(query)

    },

    async createInternetPlan({network_type, price,durationduration}) {
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.insert("meety_internet_connectivity_plan", {network_type, price,durationduration})
        return await database.promise().query(query)

    },
    async getInternetPlan() {
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.format("select * from meety_internet_connectivity_plan")
        return await database.promise().query(query)

    },

    //Add Subscription plan to User
    async addSubscripiontoUser({tablet_id, subscription_id,internet_plan_id}) {
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.insert("meety_user_parent_xref", {tablet_id, subscription_id,internet_plan_id})
        return await database.promise().query(query)

    },
}


module.exports = SubscriptionModel