import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useContext, useState, useEffect, useRef } from "react";
import axios from "axios"; // Import Axios
import settingsContext from "../../context/settingsContext";
import SettingsButton from "../SettingsButton/SettingsButton";
import PauseButton from "../PauseButton/PauseButton";
import PlayButton from "../PlayButton/PlayButton";
import styles from "./pomodorotimer.module.css";
import { AuthContext } from "../../context/authProvider";
import { toast } from "react-hot-toast";

const blueColor = "#0080FB";
const sessionDuration = 25; // Duration of each session in minutes
const breakDuration = 5; // Duration of the break in minutes

function PomodoroTimer(props) {
  const settingsInfo = useContext(settingsContext);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [sessionCount, setSessionCount] = useState(0);
  const [currentSessionDuration, setCurrentSessionDuration] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const { token } = useContext(AuthContext);
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const sessionCountRef = useRef(sessionCount);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      if (sessionCountRef.current === totalSessions) {
        // All sessions completed, reset the timer
        setMode("null");
        setSecondsLeft(0);
        setIsPaused(true);
        isPausedRef.current = true;

        // Send PUT request using Axios
        axios
          .put(
            `${process.env.REACT_APP_URL}/tasks/edit/${props.selectedTaskId}`,
            { status: "Done" },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((response) => {
            console.log("PUT request successful", response);
            toast.success(`Task completed successfully`)
          })
          .catch((error) => {
            console.error("Error sending PUT request", error);
          });

        return;
      }

      const nextMode = modeRef.current === "work" ? "break" : "work";
      let nextSeconds = 0;

      if (nextMode === "work") {
        nextSeconds = currentSessionDuration * 60;
      } else {
        nextSeconds = breakDuration * 60;
        sessionCountRef.current++;
      }

      setMode(nextMode);
      modeRef.current = nextMode;
      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    const { duration } = settingsInfo;

    if (duration <= sessionDuration) {
      // If the duration is greater than or equal to the session duration, do 1 session
      setSessionCount(1);
      sessionCountRef.current = 1;
      setSecondsLeft(duration * 60);
      secondsLeftRef.current = duration * 60;
      setCurrentSessionDuration(duration);
      setTotalSessions(1);
      setMode("work");
    } else {
      // Otherwise, calculate the number of sessions needed
      const fullSessions = Math.floor(duration / sessionDuration);
      const remainingMinutes = duration % sessionDuration;

      setSessionCount(1);
      sessionCountRef.current = 1;
      setSecondsLeft(sessionDuration * 60);
      secondsLeftRef.current = sessionDuration * 60;
      setCurrentSessionDuration(sessionDuration);
      setTotalSessions(fullSessions + 1);
      setMode("work");

      // Add the remaining minutes as the last session
      if (remainingMinutes > 0) {
        setTimeout(() => {
          sessionCountRef.current++;
          setSecondsLeft(remainingMinutes * 60);
          secondsLeftRef.current = remainingMinutes * 60;
          setCurrentSessionDuration(remainingMinutes);
          setMode("work");
        }, fullSessions * (sessionDuration * 60 * 1000 + breakDuration * 60 * 1000));
      }
    }

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
  }, [settingsInfo]);

  const totalSeconds =
    mode === "work" ? currentSessionDuration * 60 : breakDuration * 60;
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
        <div style={{ marginTop: "20px" }}>
          <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
        </div>
        {mode === "break" && (
          <div style={{ marginTop: "20px" }}>
            <p>
              Session {sessionCount}/{totalSessions}
            </p>
          </div>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <p>Total Sessions: {totalSessions}</p>
        <p>Sessions Remaining: {totalSessions - sessionCount}</p>
      </div>
    </div>
  );
}

export default PomodoroTimer;
