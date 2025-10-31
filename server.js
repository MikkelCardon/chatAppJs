import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import http from "http"
import { WebSocketServer } from "ws";

import routes from './routes.js';  
import { Message, Room} from './models.js';

import morgan from "morgan"
import { log } from "console";

const app = express();
const server = http.createServer(app)
const wss = new WebSocketServer({ server })

const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan("short"))
app.use(express.json()); //JSON as body in requests
app.use(express.static(path.join(__dirname, "public"))); // Serve all static files from the 'public' directory
app.use('/', routes);

export const rooms = new Map()

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Listen for messages from client
  ws.on('message', (data) => {
    const parsed = JSON.parse(data.toString())

    let username = parsed.sender
    let currentRoom = parsed.roomId
    let room = {}
    console.log(currentRoom);
    console.log(rooms);
    
    

    switch(parsed.type){
      case 'join':
        username = parsed.username;
        currentRoom = parsed.roomId;
        
        console.log(`${username} trying to join room: ${currentRoom}`);
        console.log('Available rooms:', Array.from(rooms.keys()));
        
        // Check if room exists
        if (!rooms.has(currentRoom)) {
          ws.send(JSON.stringify({
            type: 'error',
            message: `Room ${currentRoom} does not exist`
          }));
          return;
        }
        
        const room = rooms.get(currentRoom);
        room.addClient(ws);
        
        // Notify others in room
        room.broadcast({
          type: 'system',
          content: `${username} joined the room`
        }, ws); // Exclude the joining user from this broadcast
        
        // Confirm to user
        ws.send(JSON.stringify({
          type: 'joined',
          roomId: currentRoom,
          message: `Joined room: ${currentRoom}`
        }));
        break
        
      case 'message':
        const message = new Message(parsed.message, username, currentRoom);
        console.log("Message: ", message);
        
            
        // Broadcast to all clients in the room
        rooms.get(currentRoom).broadcast({
          type: 'message',
          content: message.content,
          sender: message.sender,
        }, ws); // Exclude sender
        
        // Send confirmation to sender
        ws.send(JSON.stringify({
          type: 'message',
          content: message.content,
          sender: message.sender,
          own: true
        }));
        break
    }
  });

  // Handle client disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // Send initial message to client
  ws.send('Welcome to the WebSocket server!');
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

