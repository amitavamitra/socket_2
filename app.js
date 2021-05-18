const  express = require('express');
const app = express();
// Static files
app.use(express.static('public'));
const formatMessage = require('./utils/message');
const socket = require('socket.io');
const server = app.listen(3000,function(){console.log('Socket_2 running at port 3000')});
const io = socket(server);
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const botName = 'ChatCord Bot';
// Socket connection

io.on('connection', function(socket){
    // console.log('made connection ' + socket.id);
    // Listen for users joining room
    
    socket.on('joinRoom' , ({username, room})=>{
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        console.log(user)
    
    socket.emit('welcome', formatMessage(botName, ''));
    socket.broadcast.to(user.room).emit('welcome',formatMessage(botName, ''));
    io.to(user.room).emit('roomUsers',{room: user.room,users: getRoomUsers(user.room)});
    console.log(user)

    })

          // Listen for chatMessage
        //   socket.on('material', msg => {
        //     const user = getCurrentUser(socket.id);
        //     io.to(user.room).emit('material', formatMessage(user.username, msg));
        //     // console.log(matkx)
        //   });

              socket.on('material',function(data){
                const user = getCurrentUser(socket.id);
                io.to(user.room).emit('material',data);
              })


              socket.on('typing',function(data){
                  socket.broadcast.emit('typing',data)
              })

              socket.on('material_bc' , function(data){
                    socket.broadcast.emit('material_bc',data)
                    console.log('material_bc :',data)
              })

              socket.on('bom',function(data){
                const user = getCurrentUser(socket.id);
                io.to(user.room).emit('bom',data);
              })

})

