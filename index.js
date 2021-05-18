const  express = require('express');
const app = express();
const socket = require('socket.io');
const server = app.listen(3000,function(){console.log('Socket_2 running at port 3000')});
const io = socket(server);

// Static files
app.use(express.static('public'));


// Socket connection

io.on('connection', function(socket){
    console.log('made connection ' + socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat',data)
    })

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    })


})

