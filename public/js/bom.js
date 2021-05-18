const chatForm = document.getElementById('mat-form');
const chatMessages = document.querySelector('.form-control');
const roomName = document.getElementById('room-name');
var  docActiveElement = document.activeElement.name;
const userList = document.getElementById('users');
var matnr =  document.getElementById('matnr');
var matnr_user =  document.getElementById('matnr_user');
var werks =  document.getElementById('werks');
var werks_user =  document.getElementById('werks_user');
var usage =  document.getElementById('usage');
var usage_user =  document.getElementById('usage_user');
var freeze = document.getElementById('freeze');
var freeze_user = document.getElementById('freeze_user');
var utyping = document.getElementById('username');
var mat_broadcast = document.getElementById('mat_broadcast');
var table = document.getElementById('table');
var mytable =  document.getElementsByTagName("table");
var addRow = document.getElementById('addRow');
var comp   = document.getElementsByClassName('comp').innerHTML;
var output = document.getElementById("output");
var arrValues = new Array();
var tableCount = 0 ; // Number of tables.
var material = [];
var material_bc = [];
var bom = [];
var bom_bc = [];
var compTable = [];

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
  // console.log(data)
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
  // console.log('KeyCode',String.fromCharCode(keyCode))
 
}
  });

// Receiving the typing data

// socket.on('typing',function(data){
//    console.log('typing data :',data)
// })
// Receive Material broadcast
socket.on('material_bc' , function(data){
  // console.log('material_bc :',data)
  mat_broadcast.innerHTML += '<p>' + data[0] + '-' + data[1] + '-' + data[2] + '-' + data[3] + '</p';
  material_bc.push(data);
})

//  KeyDown Event End

//  Emit events when sending matnr in the room
// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get message text
  let matnr = e.target.elements.matnr.value;
  let werks = e.target.elements.werks.value;
  let usage = e.target.elements.usage.value;
 
  //  Dom insert for BOM header.
bom.push(matnr);
bom.push(werks);
bom.push(usage);
// compTable =[];
    submit();
    compTable.push(document.getElementById('output').innerText);
    bom.push(compTable);
    console.log('component submitted ' ,bom)
compTable =[];
//  DOM insert for BOM component
// DOM of table contents to 
// bom.push(output);
// bom.push();
var id = document.getElementById("output");
for (let index = 0; index < id.length; index++) {
  // const element = id[index];
  console.log(id[index].innerHTML) 
}

bom_bc.push(matnr);
bom_bc.push(werks);
bom_bc.push(usage);

  if (!matnr) {
    return false;
  }

  // Emit message to server
  socket.emit('bom', bom);
  // console.log('material',material);
  // bom = [];

  socket.emit('bom_bc', bom_bc);
  // console.log('material_bc',material_bc);
  bom_bc = [];
  });

  //  Press table input..
    table.addEventListener('click' , function(){
    // console.log('table input is clicked.')
    // make sure its done only once and then emit.
      if (tableCount == 0) {
        createTable();
        tableCount += 1;
      }
       
  })
// Press for Add Row inout...

addRow.addEventListener('click',function(){
  // console.log('add row was clicked.')
  addARow();
})

subTab.addEventListener('click' ,function(){
  // Only pushes into BOM is risky!! can be overwritten by server..
  // erasing components :)
  // compTable =[];
  //   submit();
  //   compTable.push(document.getElementById('output').innerText);
  //   bom.push(compTable);
  //   console.log('component submitted ' ,bom)
    
});
// Message from server
socket.on('bom', (data) => {
//  console.log('data: ',data)
        document.getElementById('matnr').value = data[0];
        document.getElementById('werks').value = data[1];
        document.getElementById('usage').value = data[2];
        // Build the component table on return from server.
      //  console.log(data);
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

// Add the table for components
// createTable
//  Can we move this bit of table to another js ?
var arrHead = new Array();	// array for header.
arrHead = ['', 'Component','Description', 'Quantity', 'Unit'];

// first create TABLE structure with the headers. 
function createTable() {
    var empTable = document.createElement('table');
    empTable.setAttribute('id', 'empTable'); // table id.

    var tr = empTable.insertRow(-1);
    for (var h = 0; h < arrHead.length; h++) {
        var th = document.createElement('th'); // create table headers
        th.innerHTML = arrHead[h];
        tr.appendChild(th);
    }

    var div = document.getElementById('cont');
    div.appendChild(empTable);  // add the TABLE to the container.
}


// Called from AddRow Click EventListener

 function addARow() {
     var empTab = document.getElementById('empTable');
    //  console.log(material_bc);
     var rowCnt = empTab.rows.length;   // table row count.
     var tr = empTab.insertRow(rowCnt); // the table row.
     tr = empTab.insertRow(rowCnt);

     for (var c = 0; c < arrHead.length; c++) {
         var td = document.createElement('td'); // table definition.
         td = tr.insertCell(c);

         if (c == 0) {      // the first column.
             // add a button in every new row in the first column.
             var button = document.createElement('input');
             // set input attributes.
             button.setAttribute('type', 'button');
             button.setAttribute('value', 'remove');
             button.setAttribute('class', 'comp');
             // button.
             // add button's 'onclick' event.
             button.setAttribute('onclick', 'removeRow(this)');
             td.appendChild(button);
         }
         if (c == 1) {      // the second column.

          // add materials as dropdown options
             var ele = document.createElement('input');
             ele.setAttribute('type', 'text');
             ele.setAttribute('value', '');
             ele.setAttribute('class', 'comp');
             td.appendChild(ele);             
         }
         if (c == 2) { // the third column.
              // add materials as dropdown options
              var ele = document.createElement('input');
              ele.setAttribute('type', 'text');
              //  run a for loop at material_bc ? for description ?
              // ele.setAttribute('value', '');
              ele.setAttribute('class', 'comp');
                    td.appendChild(ele);
              }

              if (c == 3) { // the third column.
              // add materials as dropdown options
              var ele = document.createElement('input');
              ele.setAttribute('type', 'text');
              ele.setAttribute('value', '');
              ele.setAttribute('class', 'comp');
              td.appendChild(ele);
              }

              if (c == 4) { // the second column.
                // add materials as dropdown options
                var ele = document.createElement('input');
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', 'EA');
                ele.setAttribute('class', 'comp');
                td.appendChild(ele);
                 }

        // else {
        //      //  3rd and 4th column, will have textbox.
        //      var ele = document.createElement('input');
        //      ele.setAttribute('type', 'text');
        //      ele.setAttribute('value', 'Amitava');
        //      td.appendChild(ele);
        //  }
     }
 }

// delete TABLE row function.
function removeRow(oButton) {
  var empTab = document.getElementById('empTable');
  empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); // button -> td -> tr.
}

function submit() {
  var myTab = document.getElementById('empTable');
  

  // loop through each row of the table.
  for (row = 1; row < myTab.rows.length - 1; row++) {
    // loop through each cell in a row.
      for (c = 0; c < myTab.rows[row].cells.length; c++) {  
          var element = myTab.rows.item(row).cells[c];
          if (element.childNodes[0].getAttribute('type') == 'text') {
              arrValues.push("'" + element.childNodes[0].value + "'");
          }
      }
  }
  
  // The final output.
  // arrValues.forEach((val) => {
  //   const li = document.createElement('li');
  //   li.innerText = val.value;
  //   userList.appendChild(li);
  // });
  // document.getElementById('output').value = arrValues;
  // console.log(arrValues)

}
