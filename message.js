let currentChat = null;

function openChat(chatName){
    currentChat = chatName;
    document.getElementById("chatHeader").innerHTML =
    "<i class='fa fa-comments'></i> " + chatName;
    loadMessages();
}

function sendMessage(){
    let input = document.getElementById("messageInput");
    let message = input.value.trim();
    if(message === "" || !currentChat) return;

    let role = document.getElementById("role").value;

    let chatData = JSON.parse(localStorage.getItem(currentChat)) || [];

    chatData.push({
        sender: role,
        text: message
    });

    localStorage.setItem(currentChat, JSON.stringify(chatData));
    input.value="";
    loadMessages();
}

function loadMessages(){
    let chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";

    let role = document.getElementById("role").value;
    let chatData = JSON.parse(localStorage.getItem(currentChat)) || [];

    chatData.forEach(msg=>{
        let div = document.createElement("div");
        div.classList.add("message");

        if(msg.sender === role){
            div.classList.add("sent");
        }else{
            div.classList.add("received");
        }

        div.innerHTML = `<b><i class="fa fa-user"></i> ${msg.sender}:</b> ${msg.text}`;
        chatBox.appendChild(div);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}