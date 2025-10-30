import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import http from "http"
import { WebSocketServer } from "ws";

import routes from './routes.js';  
import { Message} from './models.js';

const app = express();
const server = http.createServer(app)
const wss = new WebSocketServer({ server })

const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json()); //JSON as body in requests
app.use(express.static(path.join(__dirname, "public"))); // Serve all static files from the 'public' directory
app.use('/', routes);

const rooms = new Map()

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Listen for messages from client
  ws.on('message', (data) => {
    console.log('Received:', data.toString());
    
    // Send a response back to the client
    ws.send('Message received: ' + data.toString());
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
