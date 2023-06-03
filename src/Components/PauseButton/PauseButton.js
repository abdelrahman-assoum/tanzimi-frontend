import React from "react";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
function PauseButton(props) {
  return (
    <button {...props} >
      <PauseCircleIcon />
    </button>
  );
}

export default PauseButton;
