import { useState, useEffect, useRef } from "react";

let seconds = 1000;
let minutes = 60 * 1000;
let hours = 3600 * 1000;

function formatTime(time) {
  const hr = Math.floor(time / hours);
  const min = Math.floor((time % hours) / minutes);
  const sec = Math.floor((time % minutes) / seconds);
  const milli = String(Math.floor(time % seconds)).padStart(2, "0");

  return { hr, min, sec, milli };
}

function StopWatch() {
  const [time, setTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const timer = useRef(null);
  const startTime = useRef(null);

  useEffect(() => {
    if (isStart) {
      startTime.current = Date.now() - time;
      timer.current = setTimeout(() => {
        setTime((prev) => Date.now() - startTime.current);
      }, 16);
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [isStart, time]);

  function handleStart() {
    setIsStart(true);
  }

  function handleStop() {
    setIsStart(false);
    clearTimeout(timer.current);
  }
  function handleRest() {
    clearTimeout(timer.current);
    setIsStart(false);
    setTime(0);
  }

  formatTime(time);
  console.log(time, "time----");

  return (
    <div className="stop-watch">
      <p>
        Hours :<span>{formatTime(time).hr}</span>
      </p>
      <p>
        Minutes: <span>{formatTime(time).min}</span>
      </p>
      <p>
        Seconds: <span>{formatTime(time).sec}</span>
      </p>
      <p>
        MilliSeconds: <span>{formatTime(time).milli}</span>
      </p>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleRest}>Reset</button>
      </div>
    </div>
  );
}

export default StopWatch;
