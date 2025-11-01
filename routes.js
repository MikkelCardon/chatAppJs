import express, { response } from 'express';
import { Message, Room} from './models.js';
import {rooms} from './server.js'

import figlet from 'figlet'

const router = express.Router()

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "front.html"));
});

router.get("/hej", (req, res) => {
  figlet.text = ("hej", (error, data) => {
    if(error) throw error

    response.write(data)
    response.end
  })
});

router.post('/room/create', (req, res) => {
  let room = new Room()
  rooms.set(room.id, room)
  console.log(rooms);
  
  res.status(201).json({
    roomId: room.id,
    message: 'Room created successfully'
  });
});

export default router