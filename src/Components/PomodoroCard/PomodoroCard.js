import React from 'react'
import styles from './pomodorocard.module.css'
import Timer from '../PomodoroTimer/Timer'

function PomodoroCard() {
  return (
    <div>
        <div className={styles.pomodoroCard}>
            <h6 className={styles.cardHeading}>Pomodoro Timer</h6>
            <Timer />
        </div>
    </div>
  )
}

export default PomodoroCard