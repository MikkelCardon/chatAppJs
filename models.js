export class Message{
  static id = 0

  constructor(content, sender){
    this.id = Message.id++
    this.content = content
    this.sender = sender
  }
}