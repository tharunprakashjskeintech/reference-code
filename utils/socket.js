
var jwt = require('jsonwebtoken')
const { database } = require('./database')
const ChatModel = require("../models/chat.model");
var io = require('socket.io')(process.env.SOCKET_PORT,
    {
        cors: {
            origin: '*',
        
        },
        
    }
)



io.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token ) {
        let user = jwt.decode(socket.handshake.query.token)
        if (user) {
            socket.decoded = user;
            if(socket.handshake.query){ 
            
            socket.reciepent_id = socket.handshake.query.reciepent_id;
           
            }
            next();
        }
        else {
            next(new Error('Authentication error'));
        }
    }
    else {
        next(new Error('Authentication error'));
    }
})

io.on('connect', function (socket) {
    console.log("Connected");
    chatID = socket.handshake.query.chatID
    socket.join(chatID)
    
var getMessages = async function (id) {

    
    
   let  [messageList] = await ChatModel.getMessages({
    id
    })

// if (document.insertId) {
     io.emit('get-message', messageList);
    // }
}

    getMessages(socket.decoded.id);

  socket.on('create-message' ,async function(data)  {
        data = JSON.parse(data)
        let {id} = socket.decoded;

        receiverChatID = message.receiverChatID
        senderChatID = message.senderChatID
        content = message.content
       
        let{messages,admin_read,status} =data;
       
        let [messageList] = await ChatModel.createMessage({
            id,messages,admin_read,status
            
        })
 
         //Send message to only that particular room
         socket.in(receiverChatID).emit('receive_message', {
            'content': content,
            'senderChatID': senderChatID,
            'receiverChatID':receiverChatID,
        })

        socket.on('disconnect', () => {
            socket.leave(chatID)
        })

        getMessages(id);
       
    })


    // socket.on('send_message', message => {
    //     receiverChatID = message.receiverChatID
    //     senderChatID = message.senderChatID
    //     content = message.content

    //     //Send message to only that particular room
    //     socket.in(receiverChatID).emit('receive_message', {
    //         'content': content,
    //         'senderChatID': senderChatID,
    //         'receiverChatID':receiverChatID,
    //     })
    // })
    

})



