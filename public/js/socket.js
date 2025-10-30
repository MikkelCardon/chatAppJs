const ws = new WebSocket('ws://localhost:8080');

const msgInput = document.getElementById("msg")
const nameInput = document.getElementById("name")

// Connection
ws.onopen = () => {
  console.log('Connected to WebSocket server');
};

// Listen for messages
ws.onmessage = (event) => {
  console.log('Message from server:', event.data);
};

function sendMessage() {
  const message = msgInput.value
  const sender = nameInput.value

  let body = JSON.stringify(message, sender)
  
  if (body && ws.readyState === WebSocket.OPEN) {
    ws.send(body);
    msgInput.value = ""
  }
}