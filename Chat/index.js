// Global Vars
let chatFormat, chatFont, chatSize, chatMessageDeleteDelay, chatColourR, chatColourG, chatColourB;

// Event Functions
const onLoad = function(obj) {
    // Logs
    console.log("Loading Fields");

    // Grabbing Fields
    const fieldData = obj.detail.fieldData;

    // Setting Global Vars
    chatFormat = fieldData.chatFormat;
    chatFont = fieldData.chatFont + ", Courier, monospace";
    chatSize = fieldData.chatSize + "px";
    chatMessageDeleteDelay = fieldData.chatMessageDelete;
    chatColourR = fieldData.chatColourR;
    chatColourG = fieldData.chatColourG;
    chatColourB = fieldData.chatColourB;
}

const onEvent = function(obj) {
    // Logs
    console.log("Event Processing...");
    
    // Null Checking
    if (!obj.detail.event) {
        return;
    }

    const event = obj.detail.event;

    // Logging Event
    console.log(event);

    // Checking if the event is a message
    if (!event.data.text) {
        return;
    }

    // Grabbing message essentials
    const username = event.data.nick;
    const message = event.data.text;
    const badges = event.data.badges || [];

    addChatMessage(username, message, badges);
}

// Util Functions
function addChatMessage(userName, userMessage, badges = []) {
    // Grabbing and Creating Elements
    const chatBox = document.getElementById("main-container");
    const chatMessageContainer = document.createElement("div");
    const chatMessage = document.createElement("span");

    // Badges
    if (badges.length > 0) {
        badges.forEach(badge => {
            const badgeImg = document.createElement("img");
            
            badgeImg.src = badge.url;
            badgeImg.alt = badge.type;
            badgeImg.title = badge.type;
            badgeImg.style.height = "1.5em";
            badgeImg.style.verticalAlign = "middle";
            badgeImg.style.marginRight = "4px";

            chatMessageContainer.appendChild(badgeImg);
        });
    }

    // Constructing Message
    chatMessage.innerHTML = chatFormat
        .replace("{user}", userName)
        .replace("{message}", userMessage);
    chatMessage.style.fontFamily = chatFont;
    chatMessage.style.fontSize = chatSize;
    chatMessage.style.color = `rgb(${chatColourR}, ${chatColourG}, ${chatColourB})`

    chatMessageContainer.appendChild(chatMessage);

    chatBox.appendChild(chatMessageContainer);

    setTimeout(() => {
        chatBox.removeChild(chatMessageContainer);
    }, chatMessageDeleteDelay * 1000);
}

// Event Listener
window.addEventListener('onWidgetLoad', onLoad);
window.addEventListener('onEventReceived', onEvent);