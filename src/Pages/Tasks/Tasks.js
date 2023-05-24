import React, { useState } from 'react'
import Button from '../../Components/Button/Button'
import SmallButton from '../../Components/SmallButton/SmallButton'
import AddNewTask from '../../Components/AddNewTask/AddNewTask'

function Tasks() {

  return (
    <>
    <div>
    <SmallButton title="+ Add new task" onClick={()=> {setDialogOpen(true)}} />
    </div>
    </>
    )
}

export default Tasks