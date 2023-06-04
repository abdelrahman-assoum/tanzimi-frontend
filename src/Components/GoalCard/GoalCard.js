import React from 'react'
import styles from './goalcard.module.css'
import CheckboxIcon from '../CheckboxIcon/CheckboxIcon'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Divider } from '@mui/material';
function GoalCard(props) {
    let tasks = props.tasks;
    let doneTasks = tasks && tasks.filter((e)=> {
        return e.status === 'Done';
    })
 const percentage = Math.round(
   ((doneTasks && doneTasks.length) / (tasks && tasks.length)) * 100
 );
    console.log(tasks);
  return (
    <>
      <div className={styles.goalCard}>
        <div className={styles.heading}>
          <h6>{props.name}</h6>
          <span>Lorem Ipsum testing</span>
          <div className="desktopView">
            <div className={styles.desktopTasks}>
              <span className={styles.tasksHead}>Goal Tasks</span>
              <Divider sx={{ marginBottom: "20px" }} />

              {tasks &&
                tasks.map((e, i) => {
                  return (
                    <div className={styles.task} key={i}>
                      <span>{e.title}</span>
                      <CheckboxIcon
                        variant={e.status}
                        style={{ alignSelf: "center" }}
                        taskId={e._id}
                        changingStatus={props.refetching}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className={styles.progress}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              strokeLinecap: "butt",
              textColor: "var(--blue2)",
              pathColor: "var(--blue2)",
            })}
          />
        </div>

        <div className={styles.details}>
          <div className={styles.dueDate}></div>
          <div className={styles.tasks}>
            <span className={styles.tasksHead}>Goal Tasks</span>
            <Divider sx={{ marginBottom: "20px" }} />

            {tasks &&
              tasks.map((e, i) => {
                return (
                  <div className={styles.task} key={i}>
                    <span>{e.title}</span>
                    <CheckboxIcon
                      variant={e.status}
                      style={{ alignSelf: "center" }}
                      taskId={e._id}
                      changingStatus={props.refetching}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default GoalCard