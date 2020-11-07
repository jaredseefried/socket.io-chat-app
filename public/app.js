$(document).ready(function () {
  var socket = io(); // For Production
  // var socket = io('http://localhost:3000/') // For Testing LocalHost Server
  const messageContainer = document.getElementById("message-container")
  
  const messageForm = document.getElementById("send-container")
  const messageInput = document.getElementById("message-input")
  

  $(".chat-page").hide();
  
  $(".submit").click(function () {
    const name = $(".username").val()
    console.log(name)
    $(".login-page").hide();
    $(".chat-page").show()
    appendMessage("You have joined")
    socket.emit("new-user", name)

    socket.on("user-connected", name => {
      appendMessage(`${name} connected`)
    })

  })

  socket.on("chat-message", data => {
    appendMessage(`${data.name}: ${data.message}`)
  })



  socket.on("user-disconnected", name => {
    appendMessage(`${name} disconnected`)
  })

  messageForm.addEventListener("submit", error => {
    error.preventDefault();
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit("send-chat-message", message)
    messageInput.value = ""
  })

  function appendMessage(message) {
    let messageElement = document.createElement("div")
    messageElement.classList.add("newMessage")
    messageElement.innerText = message

    messageContainer.append(messageElement)

    var objDiv = document.getElementById("message-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }


})



