import React from 'react'
import TaskCard from '../../Components/TaskCard/TaskCard'
import CompletedTasks from '../../Components/CompletedTasks/CompletedTasks';
import { Toaster } from 'react-hot-toast';


function Dashboard() {

  return (
    <div>
      <Toaster />
      <CompletedTasks />
    </div>
  );
}

export default Dashboard