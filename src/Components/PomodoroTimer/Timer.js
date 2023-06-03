import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useContext, useState, useEffect, useRef } from "react";
import PauseButton from "../PauseButton/PauseButton";
import PlayButton from "../PlayButton/PlayButton";
import styles from "./timer.module.css";

const green = "#4aec8c";

function Timer() {

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }
  const blueColor = "#0080FB";

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds = (nextMode === "work" ? 25 : 5) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = 25 * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const totalSeconds = mode === "work" ? 25 * 60 : 5 * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div>
      <div className={styles.pomodoroTimer}>
        <CircularProgressbar
          value={percentage}
          text={minutes + ":" + seconds}
          styles={buildStyles({
            strokeLinecap: "butt",
            textColor: blueColor,
            pathColor: blueColor,
          })}
        />
        <div style={{ marginTop: "20px" }}>
          {isPaused ? (
            <PlayButton
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }}
            />
          ) : (
            <PauseButton
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Timer;
