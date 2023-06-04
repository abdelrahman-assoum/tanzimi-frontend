import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";


const events = [{ title: "Meeting", start: new Date() }];

function Schedule() {
  return (
    <div>
      <div>
        {/* <h1>Demo App</h1> */}
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </div>
    </div>
  );
}

export default Schedule


// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}