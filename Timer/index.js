const formatTime = function(start) {
    let num = parseInt(start, 10);
    let hours = Math.floor(num / 3600);
    let minutes = Math.floor((num - (hours * 3600)) / 60);
    let seconds = num - (hours * 3600) - (minutes * 60);

    if (hours < 10) hours - "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    if (hours == "0") return minutes + ":" + seconds

    let time = minutes + ":" + seconds

    return hours == "0" ? time : hours + ":" + time;
}

const entryPoint = async function(obj) {
    let timer = document.getElementById("timer");
    const fieldData = obj.detail.fieldData;
    const timerFont = fieldData.timerFont + ", Courier, monospace";
    const timerFormat = fieldData.timerText;
    const timerSize = fieldData.timerSize;
    const timerColourRed = parseInt(fieldData.timerColourR);
    const timerColourGreen = parseInt(fieldData.timerColourG);
    const timerColourBlue = parseInt(fieldData.timerColourB);
    let currentTime = fieldData.startingTime * 60;

    timer.style.fontFamily = timerFont;
    timer.style.fontSize = timerSize + "px";
    timer.style.color = `rgb(${timerColourRed}, ${timerColourGreen}, ${timerColourBlue})`

    timerFunc(timer, currentTime, timerFormat);
}

const timerFunc = async function(timer, currentTime, format) {
    while (currentTime >= 0) {
        timer.innerText = format.replace("{timer}", formatTime(currentTime));
        currentTime--;
        
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
}

window.addEventListener('onWidgetLoad', entryPoint);