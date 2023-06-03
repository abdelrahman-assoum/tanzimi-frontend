import React from 'react'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
function PlayButton(props) {
  return (
    <button {...props}>
        <PlayCircleIcon  />
    </button>
    )
}

export default PlayButton