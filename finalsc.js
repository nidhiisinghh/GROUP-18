
//     // let startTime, interval;
//     // const timeDisplay = document.getElementById("time");
//     // const clockHand = document.querySelector(".clockhand");
//     // let elapsedTime = 0;

//     // function formatTime(ms) {
//     //     const totalSeconds = Math.floor(ms / 1000);
//     //     const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
//     //     const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
//     //     const seconds = String(totalSeconds % 60).padStart(2, '0');
//     //     return `${hours}:${minutes}:${seconds}`;
//     // }

//     let ms = 0, s = 0, m = 0, h = 0;
// let timer;
// let display = document.querySelector(".timer-Display");
// let lapsTable = document.querySelector(".laps");
// let totalSavedTimes = [];
// let mode = "timer"; 

// let clickSound = new Audio("click.mp3");
// let tickingSound = new Audio("stopwatch.mp3");
// tickingSound.loop = true;

// function playClickSound() {
//     clickSound.play();
// }

// function start() {
//     playClickSound();
//     if (!timer) {
//         document.querySelector("#pauseTimer").innerHTML = "Pause ⏸️";
//         tickingSound.play();
//         timer = setInterval(run, 10);
//         saveState(); 
//     }
// }

// function run() {
//     ms++;
//     if (ms == 100) {
//         ms = 0;
//         s++;
//     }
//     if (s == 60) {
//         s = 0;
//         m++;
//     }
//     if (m == 60) {
//         m = 0;
//         h++;
//     }
//     display.innerHTML = getTimer();
//     saveState();
// }

// function getTimer() {
//     return (
//         (h < 10 ? "0" + h : h) +
//         ":" +
//         (m < 10 ? "0" + m : m) +
//         ":" +
//         (s < 10 ? "0" + s : s) +
//         ":" +
//         (ms < 10 ? "0" + ms : ms)
//     );
// }

// function pause() {
//     playClickSound();
//     if (timer) {
//         document.querySelector("#pauseTimer").innerHTML = "Pause ⏯️";
//         stopTimer();
//         saveState();
//     }
// }

// function restart() {
//     if (timer) {
//         reset();
//         start();
//     }
    
// }

// function stopTimer() {
//     clearInterval(timer);
//     timer = null;
//     tickingSound.pause();
//     tickingSound.currentTime = 0;
//     saveState();
// }

// function lap() {
//     let L = document.createElement("li");
//     L.innerHTML = getTimer();
    
//     lapsTable.appendChild(L);
//     ms = s = m = h = 0;
//     display.innerHTML = getTimer();
//     saveState();

// }


// function reset() {
//     document.querySelector("#pauseTimer").innerHTML = "Pause";
//     playClickSound();
//     stopTimer();
//     ms = s = m = h = 0;
//     display.innerHTML = getTimer();
//     lapsTable.innerHTML = "";
//     totalSavedTimes = [];
//     saveState();
// }

// function resetLap() {
//     playClickSound();
//     lapsTable.innerHTML = "";
//     totalSavedTimes = [];
//     saveState();
// }

// function switchMode(selectedMode) {
//     mode = selectedMode;
//     document.getElementById("timerButtons").style.display = mode === "timer" ? "grid" : "none";
//     document.getElementById("lapsButtons").style.display = mode === "laps" ? "grid" : "none";
//     playClickSound();
// }

// function saveState() {
//     let state = {
//         ms, s, m, h, mode, timerRunning: !!timer,
//         laps: lapsTable.innerHTML,
//     };
//     localStorage.setItem("stopwatchState", JSON.stringify(state));
// }

// function loadState() {
//     let savedState = JSON.parse(localStorage.getItem("stopwatchState"));
//     if (savedState) {
//         ({ ms, s, m, h, mode } = savedState);
//         if (savedState.timerRunning) {
//             start();
//         }
//         display.innerHTML = getTimer();
//         lapsTable.innerHTML = savedState.laps || "";
//         switchMode(mode);
//     }
// }

// window.onload = loadState;
// window.onbeforeunload = saveState;


//     function updateClockHand(ms) {
//         const totalSeconds = ms / 1000;
//         const degrees = (totalSeconds % 60) * 6; 
//         clockHand.style.transform = `rotate(${degrees}deg)`;
//     }

//     function startStopwatch() {
//         startTime = Date.now() - elapsedTime;
//         interval = setInterval(() => {
//             elapsedTime = Date.now() - startTime;
//             timeDisplay.textContent = formatTime(elapsedTime);
//             updateClockHand(elapsedTime);
//         }, 100);
//     }


//     // function stopStopwatch() {
//     //     clearInterval(interval);
//     // }

//     // function resetStopwatch() {
//     //     clearInterval(interval);
//     //     elapsedTime = 0;
//     //     timeDisplay.textContent = "00:00:00";
//     //     clockHand.style.transform = "rotate(0deg)";
//     // }

   
//     // document.body.insertAdjacentHTML('beforeend', `
//     //     <div class="controls" style="position: absolute; top: 80%; text-align: center; width: 100%;">
//     //         <button onclick="startStopwatch()" style="font-size: 1.5rem; padding: 0.5rem 1rem; margin: 0.5rem;">Start</button>
//     //         <button onclick="stopStopwatch()" style="font-size: 1.5rem; padding: 0.5rem 1rem; margin: 0.5rem;">Stop</button>
//     //         <button onclick="resetStopwatch()" style="font-size: 1.5rem; padding: 0.5rem 1rem; margin: 0.5rem;">Reset</button>
//     //     </div>
//     // `);

let ms = 0, s = 0, m = 0, h = 0;
let timer;
let display = document.querySelector(".timer-Display");
let lapsTable = document.querySelector(".laps");
let clockHand = document.querySelector(".clockhand");
let totalSavedTimes = [];
let mode = "timer"; 

let clickSound = new Audio("click.mp3");
let tickingSound = new Audio("stopwatch.mp3");
tickingSound.loop = true;

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
    updateClockHand(ms + s * 1000 + m * 60000); // Pass total elapsed milliseconds
    saveState();
}

function updateClockHand(totalMilliseconds) {
    const totalSeconds = totalMilliseconds / 1000;
    const degrees = (totalSeconds % 60) * 6; // Each second is 6 degrees
    clockHand.style.transform = `rotate(${degrees}deg)`;
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
    let L = document.createElement("li");
    L.innerHTML = getTimer();
    lapsTable.appendChild(L);
    ms = s = m = h = 0;
    display.innerHTML = getTimer();
    saveState();
}

function reset() {
    document.querySelector("#pauseTimer").innerHTML = "Pause";
    playClickSound();
    stopTimer();
    ms = s = m = h = 0;
    display.innerHTML = getTimer();
    lapsTable.innerHTML = "";
    totalSavedTimes = [];
    updateClockHand(0); // Reset clock hand position
    saveState();
}

function resetLap() {
    playClickSound();
    lapsTable.innerHTML = "";
    totalSavedTimes = [];
    saveState();
}

function switchMode(selectedMode) {
    mode = selectedMode;
    document.getElementById("timerButtons").style.display = mode === "timer" ? "grid" : "none";
    document.getElementById("lapsButtons").style.display = mode === "laps" ? "grid" : "none";
    playClickSound();
}

function saveState() {
    let state = {
        ms, s, m, h, mode, timerRunning: !!timer,
        laps: lapsTable.innerHTML,
    };
    localStorage.setItem("stopwatchState", JSON.stringify(state));
}

function loadState() {
    let savedState = JSON.parse(localStorage.getItem("stopwatchState"));
    if (savedState) {
        ({ ms, s, m, h, mode } = savedState);
        if (savedState.timerRunning) {
            start();
        }
        display.innerHTML = getTimer();
        lapsTable.innerHTML = savedState.laps || "";
        switchMode(mode);
    }
}

window.onload = loadState;
window.onbeforeunload = saveState;