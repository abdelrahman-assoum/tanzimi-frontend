import React from 'react'
import TaskCard from '../../Components/TaskCard/TaskCard'
import CompletedTasks from '../../Components/CompletedTasks/CompletedTasks';
import { Toaster } from 'react-hot-toast';
import PomodoroCard from '../../Components/PomodoroCard/PomodoroCard';
import styles from './dashboard.module.css'
import DataNotFound from '../../Components/NotFound/DataNotFound';
import Features from '../../Components/Features/Features';
import Contact from '../../Components/Contact/Contact';

function Dashboard() {

  return (
    <div>
      <Toaster />
      {/* <div className={styles.dashboardContainer}>
           <CompletedTasks />
           <div>
             <PomodoroCard />
           </div>
      </div> */}
      {/* <Features />
       */}
       <Contact />
      {/* <DataNotFound type="Tasks"/> */}
    </div>
  );
}

export default Dashboard