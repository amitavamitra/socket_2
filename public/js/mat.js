const chatForm = document.getElementById('mat-form');
const chatMessages = document.querySelector('.form-control');
const roomName = document.getElementById('room-name');
var  docActiveElement = document.activeElement.name;
const userList = document.getElementById('users');
var matnr =  document.getElementById('matnr');
var matnr_user =  document.getElementById('matnr_user');
var matkx =  document.getElementById('matkx');
var matkx_user =  document.getElementById('matkx_user');
var mbrsh =  document.getElementById('mbrsh');
var mbrsh_user =  document.getElementById('mbrsh_user');
var matkl =  document.getElementById('matkl');
var matkl_user =  document.getElementById('matkl_user');
var matyp =  document.getElementById('matyp');
var matyp_user =  document.getElementById('matyp_user');
var meins =  document.getElementById('meins');
var meins_user =  document.getElementById('meins_user');
var freeze = document.getElementById('freeze');
var freeze_user = document.getElementById('freeze_user');
var utyping = document.getElementById('username');
var material = [];
var material_bc = [];


// var obj = JSON.parse(localStorage.getItem('dataKey'));
// var room = obj.room;
// var user = obj.user;
// console.log(room , user);

// var str = room;
// var n = str.endsWith(".html");

// console.log(n)

var timeout=undefined;
// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();
var keyCode = "";
// Join chatroom
socket.emit('joinRoom', { username, room });
document.getElementById('username').value = username;
// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  // console.log(message);
  outputMessage(message);
});

// Message from server
socket.on('typing', (data) => {
  // console.log(data);
  userTyping(data);
});

// Output message to DOM
function userTyping(data) {
  console.log(data)
}

// Listen for events

//  1.When user is typing

//  2. When emit button is pressed 

//  KeyDown Event start

//  When user is working on  matnr

chatForm.addEventListener('keydown', (e) => {
  if (e.isComposing) {
  typing=true
  socket.emit('typing', {user:username,typing:true ,keypressed:e.keyCode , docElement:document.activeElement.name})
  clearTimeout(timeout)
  timeout=setTimeout(typingTimeout, 1500)
 
}
else{
  clearTimeout(timeout)
  typingTimeout()
  // sendMessage()
}

function typingTimeout(){
    var user = "";
  typing=false
  socket.emit('typing', {user:username,typing:true ,keypressed:e.keyCode , docElement:document.activeElement.name})
  console.log('KeyCode',String.fromCharCode(keyCode))
 
}
 
  });

// Receiving the typing data

socket.on('typing',function(data){
 
  console.log('typing data :',data)

})


//  KeyDown Event End

//  Emit events when sending matnr in the room
// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get message text
  let matnr = e.target.elements.matnr.value;
  let matkx = e.target.elements.matkx.value;
  let mbrsh = e.target.elements.mbrsh.value;
  let matkl = e.target.elements.matkl.value;
  let matyp = e.target.elements.matyp.value;
  let meins = e.target.elements.meins.value;

material.push(matnr);
material.push(matkx);
material.push(mbrsh);
material.push(matkl);
material.push(matyp);
material.push(meins);


material_bc.push(matnr);
material_bc.push(matkx);
material_bc.push(matyp);
material_bc.push(meins);


  if (!matkx) {
    return false;
  }

  // Emit message to server
  socket.emit('material', material);
  // console.log('material',material);
  material = [];

  socket.emit('material_bc', material_bc);
  // console.log('material_bc',material_bc);
  material_bc = [];
  
});

// Message from server
socket.on('material', (data) => {
//  console.log('data: ',data)
        document.getElementById('matnr').value = data[0];
        document.getElementById('matkx').value = data[1];
        document.getElementById('mbrsh').value = data[2];
        document.getElementById('matkl').value = data[3];
        document.getElementById('matyp').value = data[4];
        document.getElementById('meins').value = data[5];
});

function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users in room to DOM
function outputUsers(users) {
      userList.innerHTML = '';
      users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
      });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
      if (leaveRoom) {
        window.location = '../index.html';
      } 
});

