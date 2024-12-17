var ms = 0, s = 0, m = 0, h = 0;
var timer;
var display = document.querySelector(".timer-Display");
var lapsTable = document.querySelector(".laps");

var totalSavedTimes = []; 
var clickSound = new Audio("click.mp3");
var tickingSound = new Audio("stopwatch.mp3");
tickingSound.loop = true;

function playClickSound() {
    clickSound.play();
}


function start() {
    playClickSound();
    if (!timer) {
        document.querySelector("#pauseTimer").innerHTML="Pause ⏸️";
        tickingSound.play();
        timer = setInterval(run, 10);
    }
}

function run() {
    ms++;
    if (ms == 100) {
        ms = 0;
        s++;
    }
    if (s == 60) {
        s = 0;
        m++;
    }
    if (m == 60) {
        m = 0;
        h++;
    }
    display.innerHTML = getTimer();
}

function getTimer() {
    return (
        (h < 10 ? "0" + h : h) +
        ":" +
        (m < 10 ? "0" + m : m) +
        ":" +
        (s < 10 ? "0" + s : s) +
        ":" +
        (ms < 10 ? "0" + ms : ms)
    );
}

function pause() {
    playClickSound();
    if (timer) {
        document.querySelector("#pauseTimer").innerHTML="Pause ⏯️";
        stopTimer();
        saveTime(); 
    }
}
function restart(){
    if(timer){
        reset();
        start();
    }
}
function stopTimer() {
    clearInterval(timer);
    timer = false;
    tickingSound.pause();
    tickingSound.currentTime = 0;
}
function lap() {
    let L = document.createElement("li");
    L.innerHTML = getTimer();
    let lapsList = document.querySelector(".laps"); 
    lapsList.appendChild(L);
}

function saveTime() {
    let currentTime = getTimer(); 
    totalSavedTimes.push(currentTime); 

    localStorage.setItem("savedTimes",totalSavedTimes);

}

function reset() {
    document.querySelector("#pauseTimer").innerHTML="Pause";
    playClickSound();
    stopTimer();
    resetLap();
    saveTime();
    ms = 0;
    s = 0;
    m = 0;
    h = 0;
    display.innerHTML = getTimer();
}
 



function resetLap() {
    playClickSound();
    totalSavedTimes = [];
   reset();
    lapsTable.innerHTML = "";
}
