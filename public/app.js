var socket = io();
const messageContainer = document.getElementById("message-container")

const messageForm = document.getElementById("send-container")
const messageInput = document.getElementById("message-input")

let name = prompt("what is your name?")



appendMessage("You have joined")
socket.emit("new-user", name)

socket.on("chat-message", data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on("user-connected", name => {
  appendMessage(`${name} connected`)
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


