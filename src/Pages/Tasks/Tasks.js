import React, { useState } from 'react'
import Button from '../../Components/Button/Button'
import SmallButton from '../../Components/SmallButton/SmallButton'
import AddNewTask from '../../Components/AddNewTask/AddNewTask'


function Tasks() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleDialogOpen = () => {
     setDialogOpen(true);
  }
  const handleDialogClose = () => {
    setDialogOpen(false);
  }
  return (
    <>
      <div>
        <SmallButton title="+ Add new task" onClick={handleDialogOpen} variant='filled' />
        <AddNewTask open={dialogOpen} onClose={handleDialogClose} />
      </div>
    </>
  );
}

export default Tasks