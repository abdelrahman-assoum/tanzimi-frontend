import React from 'react'
import styles from "./newtask.module.css"
function AddNewTask() {
  return (
    <>
      <div className={styles.overlay} />
      <div className="addContainer">
        <input type="text" placeholder="Add task name here" className={styles.TaskName} />
        <div className="div">
            
        </div>
      </div>
    </>
  );
}

export default AddNewTask