
    let startTime, interval;
    const timeDisplay = document.getElementById("time");
    const clockHand = document.querySelector(".clockhand");
    let elapsedTime = 0;

    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }


    function updateClockHand(ms) {
        const totalSeconds = ms / 1000;
        const degrees = (totalSeconds % 60) * 6; 
        clockHand.style.transform = `rotate(${degrees}deg)`;
    }

    function startStopwatch() {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            timeDisplay.textContent = formatTime(elapsedTime);
            updateClockHand(elapsedTime);
        }, 100);
    }


    function stopStopwatch() {
        clearInterval(interval);
    }

    function resetStopwatch() {
        clearInterval(interval);
        elapsedTime = 0;
        timeDisplay.textContent = "00:00:00";
        clockHand.style.transform = "rotate(0deg)";
    }

   
    document.body.insertAdjacentHTML('beforeend', `
        <div class="controls" style="position: absolute; top: 80%; text-align: center; width: 100%;">
            <button onclick="startStopwatch()" style="font-size: 1.5rem; padding: 0.5rem 1rem; margin: 0.5rem;">Start</button>
            <button onclick="stopStopwatch()" style="font-size: 1.5rem; padding: 0.5rem 1rem; margin: 0.5rem;">Stop</button>
            <button onclick="resetStopwatch()" style="font-size: 1.5rem; padding: 0.5rem 1rem; margin: 0.5rem;">Reset</button>
        </div>
    `);
