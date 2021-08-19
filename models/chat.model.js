const database = require("../utils/database")
const QueryGenerator = require("../generators/query.generator")
const uniqid = require('uniqid');
const { createChatMessageReplies } = require("../controllers/chat.controller");

const ChatModel = {
    async createChatMessage({user_id,messages,admin_read,status,recipient_id}) {
         let query;
         // Query generator can generate a insert query based on object we passed
         query = QueryGenerator.insert("meety_chat_messages", {user_id,messages,admin_read,status,recipient_id})
         return await database.promise().query(query)
 
     },
     async getChatMessages() {
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.format("select * from meety_chat_messages")
        return await database.promise().query(query)

    },
    async findById(id, chat) {

        let query = QueryGenerator.update('meety_chat_messages', chat, { id: id })
    
        return await database.promise().query(query)
    
      },
      async findByIdAndDelete(id){
          let query = QueryGenerator.format(`DELETE FROM meety_chat_messages where id =? `, [id])
    
        return await database.promise().query(query)
      },
      async createChatMessageReplies({message_id,message_by,admin_read,messages,message_on,user_read}) {
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.insert("meety_chat_messages_replies", {message_id,message_by,admin_read,messages,message_on,user_read})
        return await database.promise().query(query)

    },
    async getChatMessagesReplies() {
      let query;
      // Query generator can generate a insert query based on object we passed
      query = QueryGenerator.format("select * from meety_chat_messages_replies")
      return await database.promise().query(query)

  },
  async findByIdAndDeleteReplies(id){
    let query = QueryGenerator.format(`DELETE FROM meety_chat_messages_replies where id =? `, [id])

  return await database.promise().query(query)
},
  async findByIdAndUpdate(id,chat){
    let query = QueryGenerator.update('meety_chat_messages_replies', chat, { id: id })
    return await database.promise().query(query)

  },
    }

module.exports = ChatModel;