
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
       
        let{messages,admin_read,status} =data;
       
        let [messageList] = await ChatModel.createMessage({
            id,messages,admin_read,status
            
        })
 
        

        getMessages(id);
       
    })
    

})



