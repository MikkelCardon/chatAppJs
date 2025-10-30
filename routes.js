import express from 'express';
import { Message} from './models.js';

const router = express.Router()

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

router.post("/message", (req, res) => {
  console.log("New request");
  
  const {content, sender} = req.body

  if(!content || !sender){
    return res.status(400).json({
      error: "Need to have both 'content' and 'sender'"
    })
  }

  const message = new Message(content, sender)
  console.log(message)

  res.status(201).json({
    success: true,
    message: message
  })
})

export default router