import React from 'react'
import styles from './completed.module.css'
import LowOpacityLogo from '../../Assets/logo10op.svg'
function CompletedTasks(props) {
  return (
    <>
      <div className={styles.completedTasks}>
        <div className={styles.image}>
            <img src={LowOpacityLogo} alt="logo" />
        </div>
        <h4 className={styles.title}>Completed Tasks</h4>
        <h4 className={styles.counter}>{props.counter || 0}</h4>
      </div>
    </>
  );
}

export default CompletedTasks