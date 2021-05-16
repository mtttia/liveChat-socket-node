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

socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    //msg is a json so
    msg = JSON.parse(msg);
    item.textContent = msg.name + " : " + msg.text;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});


