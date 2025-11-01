export class Message{
  static id = 0

  constructor(content, sender, roomId){
    this.id = Message.id++
    this.content = content
    this.sender = sender
    this.roomId = roomId
  }
}

export class Room {
  constructor() {
    this.id = String(getRandomInt(10000, 99999))
    this.clients = new Set(); // WebSocket connections for this room
  }

  addClient(ws) {
    this.clients.add(ws);
  }

  removeClient(ws) {
    this.clients.delete(ws);
  }

  broadcast(message, excludeWs = null) {
    this.clients.forEach(client => {
      if (client !== excludeWs && client.readyState === 1) { // 1 = OPEN
        client.send(JSON.stringify(message));
      }
    });
  }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}