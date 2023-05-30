import React from "react";
import styles from "./taskheading.module.css";
function TaskHeading(props) {
  return (
    <div>
      <div className={styles.taskHeading}>
        <div className={styles.headingCircle}>{props.counter || 0}</div>
        <h4 className={styles.headingTitle}>{props.title || "In-Progress"}</h4>
      </div>
    </div>
  );
}

export default TaskHeading;
