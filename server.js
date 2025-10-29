import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
// Serve all static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

//Endpoint for index html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.post("/message", (req, res) => {
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
    succes: true,
    message: message
  })
})

let messages = new Map()

class Message{
  static id = 0

  constructor(content, sender){
    this.id = Message.id++
    this.content = content
    this.sender = sender
  }
}
