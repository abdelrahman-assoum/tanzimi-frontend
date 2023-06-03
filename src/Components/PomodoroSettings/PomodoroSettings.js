import Slider from "@mui/material/Slider";
import styles from './pomodorosettings.module.css'
import { useContext } from "react";
import settingsContext from "../../context/settingsContext";
function PomodoroSettings() {
    const settingsInfo = useContext(settingsContext);
  return (
    <div>
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          <label>Focus Session Length: {settingsInfo.workMinutes}:00</label>
          <Slider
            value={settingsInfo.workMinutes}
            onChange={(e) => settingsInfo.setWorkMinutes(e.target.value)}
            step={5}
            min={5}
            max={120}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </div>
        <div className={styles.slider}>
          <label>Break Session Length: {settingsInfo.breakMinutes}:00</label>
          <Slider
            // defaultValue={5}
            value={settingsInfo.breakMinutes}
            onChange={(e) => settingsInfo.setBreakMinutes(e.target.value)}
            min={0}
            max={30}
            step={5}
            valueLabelDisplay="auto"
          />
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {/* <BackButton onClick={() => settingsInfo.setShowSettings(false)} /> */}
      </div>
    </div>
  );
}

export default PomodoroSettings;
