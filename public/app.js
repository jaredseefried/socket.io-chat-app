$(document).ready(function () {
  // var socket = io(); // For Production
  var socket = io('http://localhost:3000/') // For Testing LocalHost Server
  const messageContainer = document.getElementById("message-container")

  const messageForm = document.getElementById("send-container");
  const messageInput = document.getElementById("message-input");


  $(".chat-page").hide();

  $(".submit").click(function () {

    const name = $(".username").val();
    $(".login-page").hide();
    $(".chat-page").show();
    userConnected("You have joined");
    socket.emit("new-user", name);

    socket.on("user-connected", name => {
      userConnected(`${name} connected`);
    });
  });

  socket.on("chat-message", data => {
    messagedReceived(`${data.name}: ${data.message}`);
  });

  socket.on("user-disconnected", name => {
    userDisconnected(`${name} disconnected`);
  });

  messageForm.addEventListener("submit", error => {
    error.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit("send-chat-message", message);
    messageInput.value = "";
  });

  function appendMessage(message) {
    let messageElement = document.createElement("div");
    messageElement.classList.add("newMessage");

    messageElement.innerText = message;

    messageContainer.append(messageElement);

    var objDiv = document.getElementById("message-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  function userDisconnected(message) {
    let disconnectMessage = document.createElement("div");
    disconnectMessage.classList.add("user-disconnected", "text-center")

    disconnectMessage.innerText = message

    messageContainer.append(disconnectMessage)

    var objDiv = document.getElementById("message-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  function messagedReceived(message){
    let receivedMessage = document.createElement("div");
    receivedMessage.classList.add("received-message")

    receivedMessage.innerText = message

    messageContainer.append(receivedMessage)

    var objDiv = document.getElementById("message-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  function userConnected(message) {
    let connectMessage = document.createElement("div");
    connectMessage.classList.add("user-connected", "text-center")

    connectMessage.innerText = message

    messageContainer.append(connectMessage)

    var objDiv = document.getElementById("message-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

});


