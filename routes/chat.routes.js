var express = require('express');
 const chatController = require('../controllers/chat.controller');
 const router = express.Router();


 router.post('/create-chat-message', chatController.createChatMessage)

 router.get('/get-chat-message', chatController.getChatMessage)

 router.delete('/delete-chat-message/:id',chatController.deleteChatMessage)

 router.put('/update-chat-message/:id',chatController.updateChatMessage)

 router.post('/create-chat-message-replies', chatController.createChatMessageReplies)

 router.get('/get-chat-message-replies', chatController.getChatMessageReplies)

 router.delete('/delete-chat-message-replies/:id',chatController.deleteChatMessageReplies)

 router.put('/update-chat-message-replies/:id',chatController.updateChatMessageReplies)

 module.exports=router;