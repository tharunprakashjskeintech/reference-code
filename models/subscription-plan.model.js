
const database = require("../utils/database")
const QueryGenerator = require("../generators/query.generator")


const SubscriptionModel = {
   async createSubscriptionPlan({s_plan_name, s_plan_duration,s_plan_price,s_plan_no_of_contacts,s_plan_call_duration}) {
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.insert("meety_subscription_plan", {s_plan_name, s_plan_duration,s_plan_price,s_plan_no_of_contacts,s_plan_call_duration})
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

    }
}


module.exports = SubscriptionModel