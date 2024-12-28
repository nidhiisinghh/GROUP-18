let ms = 0, s = 0, m = 0, h = 0;
let timer;
let display = document.querySelector(".timer-Display");
let lapsTable = document.querySelector(".laps");
let mode = "timer";

let clickSound = new Audio("click.mp3");
let tickingSound = new Audio("stopwatch.mp3");
tickingSound.loop = true;

let resetTimes = JSON.parse(localStorage.getItem("resetTimes")) || [];
let pausedTimes = JSON.parse(localStorage.getItem("pausedTimes")) || [];

function playClickSound() {
    clickSound.play();
}

function start() {
    playClickSound();
    if (!timer) {
        document.querySelector("#pauseTimer").innerHTML = "Pause ⏸️";
        tickingSound.play();

        // Save the start time
        const startTime = Date.now() - getElapsedMilliseconds();
        localStorage.setItem("startTime", startTime);

        timer = setInterval(run, 10);
        saveState();
    }
}

function run() {
    const elapsedTime = getElapsedMilliseconds();
    ms = Math.floor((elapsedTime % 1000) / 10);
    s = Math.floor((elapsedTime / 1000) % 60);
    m = Math.floor((elapsedTime / 60000) % 60);
    h = Math.floor(elapsedTime / 3600000);

    display.innerHTML = getTimer();
}

function getElapsedMilliseconds() {
    const startTime = parseInt(localStorage.getItem("startTime")) || 0;
    return timer ? Date.now() - startTime : ms + s * 1000 + m * 60000 + h * 3600000;
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
        document.querySelector("#pauseTimer").innerHTML = "Pause ⏯️";
        stopTimer();

        pausedTimes.push(getTimer());
        saveState();
    }
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
    tickingSound.pause();
    tickingSound.currentTime = 0;
    localStorage.removeItem("startTime");
    saveState();
}

function reset() {
    playClickSound();
    resetTimes.push(getTimer());
    stopTimer();
    ms = s = m = h = 0;
    display.innerHTML = getTimer();
    lapsTable.innerHTML = "";
    saveState();
}

function addLap(label) {
    let L = document.createElement("li");
    L.innerHTML = `${label}: ${getTimer()}`;
    lapsTable.appendChild(L);
}

function saveState() {
    let state = {
        ms, s, m, h, mode, timerRunning: !!timer,
        laps: lapsTable.innerHTML,
    };
    localStorage.setItem("stopwatchState", JSON.stringify(state));
    localStorage.setItem("resetTimes", JSON.stringify(resetTimes));
    localStorage.setItem("pausedTimes", JSON.stringify(pausedTimes));
}

function loadState() {
    let savedState = JSON.parse(localStorage.getItem("stopwatchState"));
    if (savedState) {
        ({ ms, s, m, h, mode } = savedState);

        // If the timer was running, resume it
        const startTime = localStorage.getItem("startTime");
        if (startTime) {
            start();
        }

        display.innerHTML = getTimer();
        lapsTable.innerHTML = savedState.laps || "";
        switchMode(mode);
    }
    resetTimes = JSON.parse(localStorage.getItem("resetTimes")) || [];
    pausedTimes = JSON.parse(localStorage.getItem("pausedTimes")) || [];
}

window.onload = loadState; 
