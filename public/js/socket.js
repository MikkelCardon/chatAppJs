const ws = new WebSocket('ws://localhost:8080');

const msgInput = document.getElementById("msg")

// Connection
ws.onopen = () => {
  console.log('Connected to WebSocket server');
};

// Listen for messages
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    

    switch(data.type) {
      case 'joined':
        console.log(data.message);
        break;
        
      case 'message':
        displayMessage(data.content, data.sender, data.own);
        break;
        
      case 'system':
        displaySystemMessage(data.content);
        break;
    }
  };

function sendMessage() {
  console.log("Sending message");
  
  const message = msgInput.value
  const sender = localStorage.getItem('name')
  const roomId = localStorage.getItem('roomId')

  let body = JSON.stringify({
    type: "message",
    message,
    sender,
    roomId
  })
    
  console.log(body);
  
  if (body && ws.readyState === WebSocket.OPEN) {
    ws.send(body);
    msgInput.value = ""
  }
}

function joinRoom(){
  ws.send(JSON.stringify({
    type: 'join',
    roomId: roomId,
    username: username
  }));
}

// Display message
function displayMessage(text, sender, isOwn) {
  console.log("Displaying message");
  console.log(text, sender, isOwn);
  
  
  const messagesDiv = document.getElementById('message-section');
  const messageEl = document.createElement('div');
  messageEl.classList.add("message")
  messageEl.classList.add(`message-${isOwn ? 'sent' : 'received'}`)
  
  const senderEl = document.createElement('div');
  senderEl.className = 'sender-name';
  senderEl.textContent = sender;
  
  const contentEl = document.createElement('div');
  contentEl.textContent = text;
  
  messageEl.appendChild(senderEl);
  messageEl.appendChild(contentEl);
  messagesDiv.appendChild(messageEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  console.log("End");
  
}

// Display system message
function displaySystemMessage(text) {
  const messagesDiv = document.getElementById('message-section');
  const messageEl = document.createElement('div');
  messageEl.className = 'message system';
  messageEl.textContent = text;
  messagesDiv.appendChild(messageEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
