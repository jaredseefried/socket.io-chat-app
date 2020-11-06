
var http = require('http');
var express = require('express');
var app = express();

var server = http.createServer(app);
// Pass a http.Server instance to the listen method
var io = require('socket.io').listen(server);

app.use('/static', express.static('node_modules'));

const users = {}

io.on("connection", socket => {
    socket.on("new-user", name => {
        users[socket.id] = name
        socket.broadcast.emit("user-connected", name)
    })
    socket.on("send-chat-message", message => {
        // console.log(message);
        socket.broadcast.emit("chat-message", {message: message, name: users[socket.id]})
    })
    socket.on("disconnect", name => {
        socket.broadcast.emit("user-disconnected", users[socket.id])
        delete users[socket.id]
    })
})

// var server = app.listen(PORT, function () {
//     console.log("App listening on PORT " + PORT);
// });

server.listen(3000)
