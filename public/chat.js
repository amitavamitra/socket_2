// Make connection
var socket = io.connect("http://localhost:3000")

// Query DOM

var message = document.getElementById('message');
var output = document.getElementById('output');
var user = document.getElementById('user');
var btn = document.getElementById('send');
var feedback = document.getElementById('feedback');


//  Emit events 

btn.addEventListener('click', function(){
    socket.emit('chat' ,{
        message:message.value,
        user: user.value
    })
})

// Listen for events
socket.on('chat',function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>'+ data.value + '</strong>' + data.message  + '</p>';
})


message.addEventListener('keypress',function(){
    socket.emit('typing', user.value)
})

socket.on('typing',function(data){
    console.log(data)
    feedback.innerHTML = "<p><em>" + data + " is typing a message ..." + '</em></p>';
})