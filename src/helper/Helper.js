const Helper = class{
    static addMessage(avatar, message, name)
    {
        let messageList = document.getElementById("messages");
        let messageSend = document.createElement("div");
        messageSend.classList.add("messageReceived");
        messageSend.innerHTML = `
            <div class="avatar"><img class="avatar" src="${avatar}" alt="Avatar" class="rounded-circle me-2"></div>
            <div class="text"><b>${name}</b> </br>${message}</div>
            <div class="time">12:34</div>
            `
        messageList.appendChild(messageSend);
        this.saveLocalStorage(messageList);
    }
    static AddSendMessage(message)
    {
        let messageList = document.getElementById("messages");
        let messageSend = document.createElement("div");
        messageSend.classList.add("messageSended");
        messageSend.innerHTML = `
        <div class="avatar"></div>
        <div class="text">${message}</div>
        <div class="time">12:34</div>
        `
        messageList.appendChild(messageSend);
        this.saveLocalStorage(messageList);
    }
    static saveLocalStorage(element) {
        localStorage.setItem("allMessages", element.innerHTML);
    }
    static getLocalStorageMessage() {
        let messageList = document.getElementById("messages");
        messageList.innerHTML = localStorage.getItem("allMessages");
    }
}
export default Helper;