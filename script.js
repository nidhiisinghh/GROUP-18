var ms = 0, s = 0, m = 0, h = 0;
var timer;
var display = document.querySelector(".timer-Display");
var laps = document.querySelector(".laps");

var clickSound = new Audio("click.mp3");
var tickingSound = new Audio("stopwatch.mp3");
tickingSound.loop = true; 

function playClickSound() {
    clickSound.play();
}

function start() {
    playClickSound();
    if (!timer) {
        tickingSound.play(); 
        timer = setInterval(run, 10);
    }
}

function run() {
    display.innerHTML = getTimer();
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
    if (h == 24) {
        h = 0;
    }
}

function getTimer() {
    return (h < 10 ? "0" + h : h) + " : " + (m < 10 ? "0" + m : m) + " : " + (s < 10 ? "0" + s : s) + " : " + (ms < 10 ? "0" + ms : ms);
}

function pause() {
    playClickSound();
    stopTimer();
}

function stopTimer() {
    clearInterval(timer);
    timer = false;
    tickingSound.pause(); 
    tickingSound.currentTime = 0; 
}

function reset() {
    playClickSound();
    stopTimer();
    ms = 0;
    s = 0;
    m = 0;
    h = 0;
    display.innerHTML = getTimer();
}

function restart() {
    playClickSound();
    if (timer) {
        reset();
        start();
    }
}

function lap() {
    playClickSound();
    if (timer) {
        var Li = document.createElement("li");
        Li.innerHTML = getTimer();
        laps.appendChild(Li);
    }
}

function resetLap() {
    playClickSound();
    laps.innerHTML = "";
}
