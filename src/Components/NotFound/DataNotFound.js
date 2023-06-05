import React from "react";
import styles from "./notfound.module.css";
import shape from "../../Assets/Images/shape.svg";
import goals from "../../Assets/Images/goals.svg";
import tasks from "../../Assets/Images/tasks.svg";
import notes from "../../Assets/Images/notes.svg";
function DataNotFound(props) {
  return (
    <div className={styles.dataNotFound}>
      <div className={styles.illustration}>
        <div className={styles.shape}>
          <img src={shape} alt="shape" />
        </div>
        <div className={styles.icon}>
          <img
            src={
              props.type === "Tasks"
                ? tasks
                : props.type === "Goals"
                ? goals
                : props.type === "Notes"
                ? notes
                : ""
            }
            alt={props.type}
          />
        </div>
      </div>
      <div className={styles.content}>
        <h4>{`You Don't Have ${props.type}`}</h4>
        <span>
          To create a new one, click on the "Add" button located at the top of
          the page.
        </span>
      </div>
    </div>
  );
}

export default DataNotFound;
