import React from 'react'
import NavPanel from '../../Components/NavPanel/NavPanel'
import JournalCard from '../../Components/JournalCard/JournalCard'

function Journals() {
  const today = new Date();
const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);
  
// console.log(formattedDate);

  return (
    <div>
      <div>
        <NavPanel title='Journals' />
        <JournalCard journalDate={formattedDate} />
      </div>
    </div>
  )
}

export default Journals