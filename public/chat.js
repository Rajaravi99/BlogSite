// Query DOM
// const socket=io('https://blogsite-r2mj.onrender.com'); // in production 
const socket=io('http://localhost:3000'); // in development testing
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click',()=>{
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress',()=>{
    socket.emit('typing', handle.value);
});
// listen to events comming from server side
console.log(socket.id);
socket.on('chat', function(data){
    feedback.innerHTML = '';
    console.log(data);
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});