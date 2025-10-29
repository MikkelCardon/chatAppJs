const url = "localhost:8080/"

async function sendMessage(){
    const content = document.getElementById("msg").value
    const sender = document.getElementById("name").value

    let res = await fetch("/message",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"content": content, "sender":sender})
    })
    let json = await res.json()
    console.log(json  );
    

}