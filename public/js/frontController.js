async function createRoom(){
    let res = await fetch("/room/create", {
        method: "POST"
    })
    
    if(!res.ok){
        throw new Error(res.Error)
    }

    let {roomId} = await res.json()
    window.name = document.getElementById("name").value
    window.roomId = roomId

    console.log(window.name, window.roomId);
}
