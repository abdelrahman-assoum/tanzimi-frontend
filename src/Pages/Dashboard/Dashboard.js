import React from 'react'
import TaskCard from '../../Components/TaskCard/TaskCard'
import CompletedTasks from '../../Components/CompletedTasks/CompletedTasks';
import { Toaster } from 'react-hot-toast';
import PomodoroCard from '../../Components/PomodoroCard/PomodoroCard';
import styles from './dashboard.module.css'

function Dashboard() {

  return (
    <div>
      <Toaster />
      <div className={styles.dashboardContainer}>
           <CompletedTasks />
           <div>
             <PomodoroCard />
           </div>
      </div>
    </div>
  );
}

export default Dashboard