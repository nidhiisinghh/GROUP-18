let ms = 0, s = 0, m = 0, h = 0;
let timer;
let display = document.querySelector(".timer-Display");
let lapsTable = document.querySelector(".laps");
let mode = "timer"; 

let clickSound = new Audio("click.mp3");
let tickingSound = new Audio("stopwatch.mp3");
tickingSound.loop = true;

// Arrays to track reset and paused times
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
        timer = setInterval(run, 10);
        saveState();
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
        document.querySelector("#pauseTimer").innerHTML = "Pause ⏯️";
        stopTimer();
        addLap("Paused at");
        pausedTimes.push(getTimer());
        saveState();
    }
}

function restart() {
    if (timer) {
        reset();
        start();
    }
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
    tickingSound.pause();
    tickingSound.currentTime = 0;
    saveState();
}

function lap() {
    addLap("Lap");
    ms = s = m = h = 0;
    display.innerHTML = getTimer();
    saveState();
}

function reset() {
    playClickSound();
    addLap("Reset at");
    resetTimes.push(getTimer());
    stopTimer();
    ms = s = m = h = 0;
    display.innerHTML = getTimer();
    lapsTable.innerHTML = "";
    saveState();
}

function resetLap() {
    playClickSound();
    lapsTable.innerHTML = "";
    saveState();
}

function switchMode(selectedMode) {
    mode = selectedMode;
    document.getElementById("timerButtons").style.display = mode === "timer" ? "grid" : "none";
    document.getElementById("lapsButtons").style.display = mode === "laps" ? "grid" : "none";
    playClickSound();
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
        resetTimes,
        pausedTimes,
    };
    localStorage.setItem("stopwatchState", JSON.stringify(state));
    localStorage.setItem("resetTimes", JSON.stringify(resetTimes));
    localStorage.setItem("pausedTimes", JSON.stringify(pausedTimes));
}

function loadState() {
    let savedState = JSON.parse(localStorage.getItem("stopwatchState"));
    if (savedState) {
        ({ ms, s, m, h, mode, resetTimes, pausedTimes } = savedState);
        if (savedState.timerRunning) {
            start();
        }
        display.innerHTML = getTimer();
        lapsTable.innerHTML = savedState.laps || "";
        switchMode(mode);
    }

    if (resetTimes) {
        resetTimes.forEach(time => addLap(`Reset at: ${time}`));
    }
    if (pausedTimes) {
        pausedTimes.forEach(time => addLap(`Paused at: ${time}`));
    }
}

window.onload = loadState;

