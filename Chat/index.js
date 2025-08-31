// Global Vars
let chatFormat, chatFont, chatSize, chatMessageDeleteDelay, chatColourR, chatColourG, chatColourB;

// Debug Vars
let debug = true;
const twitchChatWords = [
  // Emotes & shorthand
  "Pog", "PogChamp", "LUL", "KEKW", "PepeLaugh", "monkaW", "Pepega", 
  "FeelsBadMan", "BibleThump", "Kappa", "OMEGALUL", "EZ", "GG", 
  "PepeHands", "HYPERS",

  // Spammy hype words
  "LET'S GO", "CLUTCH", "INSANE", "W", "SHEESH", "EZ clap", "RIP", 
  "YOOOO", "BROOO", "GG EZ",

  // Copy-pasta vibes
  "copium", "cringe", "based", "ratio", "????", "malding", "sus",

  // Game-related reactions
  "HEADSHOT", "ONE TAP", "HUGE", "NO WAY", "STREAM SNIPER", "RNG", 
  "BOT", "SMURF",

  // Support/hype
  "HI CHAT", "HI YOUTUBE", "LOVE YOU", "SUB HYPE", "RAID", "GIFTED", 
  "DONO WALL"
];
const twitchUsernames = [
  "xX_NoScope420_Xx",
  "PogLord99",
  "KappaKing",
  "DankMemez",
  "ClutchOrKick",
  "UwU_GamerGirl",
  "ShadowNinja",
  "BigChungusTV",
  "TryHardTimmy",
  "EZClapMaster",
  "SaltyTears",
  "OmegaLulz",
  "BasedWizard",
  "CringeLord",
  "PepegaPal",
  "SusImposter",
  "RatioRuler",
  "WKeyWarrior",
  "BotSlayer9000",
  "StreamerSniper",
  "RNGesus",
  "HeadshotHarry",
  "SubTrainConductor",
  "GiftBombBob",
  "HypeBeastXD",
  "RaidBossRick",
  "DonowallDanny"
];

// Util Functions
const getRandomInt = function(max) {
  return Math.floor(Math.random() * max);
}

// Event Functions
const onLoad = async function(obj) {
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

    // Debug
    if (debug) {
        console.log("Starting Debug...");
    }
    
    while (debug) {
        addChatMessage(twitchUsernames[getRandomInt(twitchUsernames.length)], twitchChatWords[getRandomInt(twitchChatWords.length)], []);

        await new Promise((resolve) => setTimeout(resolve, getRandomInt(3) * 1000));
    }
}

const onEvent = async function(obj) {
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