import express from 'express';
import { Message, Room} from './models.js';

const router = express.Router()

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "front.html"));
});

router.post('/room/create', (req, res) => {
  let room = new Room()
  
  res.status(201).json({
    roomId: room.id,
    message: 'Room created successfully'
  });
});

export default router