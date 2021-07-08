const database = require("../utils/database")
const QueryGenerator = require("../generators/query.generator")

const ChatModel = {
    async createMessage({user_id,messages,admin_read,status}) {
         let query;
         // Query generator can generate a insert query based on object we passed
         query = QueryGenerator.insert("meety_chat_messages", {user_id,messages,admin_read,status})
         return await database.promise().query(query)
 
     },
     async getMessages() {
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.format("select * from meety_chat_messages")
        return await database.promise().query(query)

    },
    }

module.exports = ChatModel