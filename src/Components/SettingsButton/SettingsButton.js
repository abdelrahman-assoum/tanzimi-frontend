import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from './settingsbutton.module.css'
function SettingsButton(props) {
  return (
    <button {...props}  className={styles.buttonDisplay}>
      <div className={styles.settingsButton}>
        <SettingsIcon />
        <span>Settings</span>
      </div>
    </button>
  );
}

export default SettingsButton;
