//ANSWER THE NAME 
let userName = prompt('what is your name');



//FOR SOCKET CONNECTION

var socket = io.connect('localhost:3000');

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

//inizio il protocollo di rete mandando il nome
socket.emit('my name', userName);

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('user added', (msg)=>{
    //an user added
    console.log(msg + " joined the chat");
})

socket.on('user disconnected', (msg)=>{
    //an user disconnected
    console.log(msg + " disconnected");
})

socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    //msg is a json so
    msg = JSON.parse(msg);
    item.textContent = msg.name + " : " + msg.text;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('cannot add you', (msg)=>{
    //I cannot be added
    userName = prompt(msg + '\nWhat is your name');
    socket.emit('my name', userName);
})