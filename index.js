const express = require('express');
const path = require('path');
let app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000);

app.get('/', function(request, response){
    response.sendFile(__dirname + 'public/index.html');
});

let users = [];
let connections = [];

io.sockets.on('connection', function(socket){
    console.log("Connected")

    connections.push(socket);
    
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected")
    });

    socket.on('send message', function(data){
        io.sockets.emit('add message', {msg: data.message, name: data.name});
    });
});