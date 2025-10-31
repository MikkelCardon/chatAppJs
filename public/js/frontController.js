async function createRoom(){
    let name = document.getElementById("name").value
    
    if(!name){
        alert("Name cant be empty")
        throw new Error("Name cant be empty")
    }

    let res = await fetch("/room/create", {
        method: "POST"
    })
    
    if(!res.ok){
        throw new Error(res.Error)
    }

    let {roomId} = await res.json()
    
    localStorage.setItem("name", name);
    localStorage.setItem("roomId", roomId);

    console.log(name, roomId);
    window.location.href = "app.html";
}

async function joinRoom(){
    let name = document.getElementById("name").value
    let roomId = document.getElementById("roomId").value
    
    if(!name){
        alert("Name cant be empty")
        throw new Error("Name cant be empty")
    }

    if(!roomId){
        alert("RoomId cant be empty")
        throw new Error("RoomId cant be empty")
    }
    
    localStorage.setItem("name", name);
    localStorage.setItem("roomId", roomId);

    console.log(name, roomId);
    window.location.href = "app.html";
}