import "./App.css";
import React, { useState } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [play, setPlay] = useState(false);
  const [timingType, setTimingType] = useState("SESSION");
  const [timeLeft, setTimeLeft] = useState(1500);

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const clock = () => {
    if (play) {
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && timingType === "SESSION") {
      setTimeLeft(breakLength * 60);
      setTimingType("BREAK");
      audio.play();
    }
    if (!timeLeft && timingType === "BREAK") {
      setTimeLeft(sessionLength * 60);
      setTimingType("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  React.useEffect(() => {
    clock();
  }, [play, timeLeft, timeout]);

  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div>
      <div className="wrapper">
        <h2>Clock 25 + 5 Project</h2>
        <div className="break-session-length">
          <div>
            <h3 id="break-label">Break Length</h3>
            <div>
              <button
                disabled={play}
                id="break-increment"
                onClick={handleBreakIncrease}
              >
                Increase
              </button>
              <strong id="break-length">{breakLength}</strong>

              <button
                disabled={play}
                id="break-decrement"
                onClick={handleBreakDecrease}
              >
                Decrease
              </button>
            </div>
          </div>
          <h3 id="session-label">Session Length</h3>
          <div>
            <button
              disabled={play}
              id="session-increment"
              onClick={handleSessionIncrease}
            >
              Increase
            </button>
            <strong id="session-length">{sessionLength}</strong>
            <button
              disabled={play}
              id="session-decrement"
              onClick={handleSessionDecrease}
            >
              Decrease
            </button>
          </div>
        </div>
        <div className="time-wrapper">
          <div className="timer">
            <h2 id="timer-label">{title}</h2>
            <h3 id="time-left">{timeFormatter()}</h3>
          </div>
        </div>
        <button onClick={handlePlay} id="start_stop">
          Start/Stop
        </button>
        <button onClick={handleReset} id="reset">
          Reset
        </button>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default App;
