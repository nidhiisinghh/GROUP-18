var ms = 0, s = 0, m = 0, h = 0;
var timer;
var display = document.querySelector(".timer-Display");
var laps = document.querySelector(".laps");

var totalSavedTimes = [];
var lastResetTime = null;
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
        saveTimerState(); 
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
    saveTimerState(); 
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
        stopTimer();
        saveTime();
    }
}

function stopTimer() {
    clearInterval(timer);
    timer = false;
    tickingSound.pause();
    tickingSound.currentTime = 0;
    saveTimerState(); 
}

function restart() {
    if (timer) {
        reset();
        start();
    }
}

function lap() {
    let L = document.createElement("li");
    L.innerHTML = getTimer();
    let lapsList = document.querySelector(".laps"); 
    lapsList.appendChild(L);
}

function resetLap() {
    playClickSound();
    totalSavedTimes = [];
    reset();
    laps.innerHTML = "";
}

function saveTime() {
    let currentTime = getTimer();
    totalSavedTimes.push(currentTime);
    localStorage.setItem("savedTimes", JSON.stringify(totalSavedTimes));
}

function reset() {
    playClickSound();
    stopTimer();
    lastResetTime = getTimer();
    ms = 0;
    s = 0;
    m = 0;
    h = 0;
    display.innerHTML = getTimer();
    saveLastResetTime();
    saveTimerState();
}

function saveLastResetTime() {
    if (lastResetTime) {
        localStorage.setItem("lastResetTime", lastResetTime);
    }
}

function saveTimerState() {
    const timerState = {
        ms,
        s,
        m,
        h,
        running: !!timer 
    };
    localStorage.setItem("timerState", JSON.stringify(timerState));
}

window.onload = function () {
    let saved = localStorage.getItem("savedTimes");
    if (saved) {
        totalSavedTimes = JSON.parse(saved);
    }

    let resetSaved = localStorage.getItem("lastResetTime");
    if (resetSaved) {
        lastResetTime = resetSaved;
    }

    let savedTimerState = localStorage.getItem("timerState");
    if (savedTimerState) {
        let { ms: savedMs, s: savedS, m: savedM, h: savedH, running } = JSON.parse(savedTimerState);
        ms = savedMs || 0;
        s = savedS || 0;
        m = savedM || 0;
        h = savedH || 0;

        display.innerHTML = getTimer();

        if (running) {
            start();
        }
    } else {
        display.innerHTML = getTimer();
    }
};
