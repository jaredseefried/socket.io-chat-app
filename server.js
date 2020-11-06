var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var PORT = process.env.PORT || 3000;


app.use('/static', express.static('node_modules'));
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public');
  });

const users = {}

io.on("connection", socket => {
    socket.on("new-user", name => {
        users[socket.id] = name
        socket.broadcast.emit("user-connected", name)
    })
    
    socket.on("send-chat-message", message => {
        // console.log(message);
        socket.broadcast.emit("chat-message", { message: message, name: users[socket.id] })
    })
    socket.on("disconnect", name => {
        socket.broadcast.emit("user-disconnected", users[socket.id])
        delete users[socket.id]
    })
})

server.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
