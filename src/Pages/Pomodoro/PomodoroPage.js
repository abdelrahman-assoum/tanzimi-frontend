import React, { useContext, useState } from "react";
import PomodoroTimer from "../../Components/PomodoroTimer/PomodoroTimer";
import PomodoroSettings from "../../Components/PomodoroSettings/PomodoroSettings";
import settingsContext from "../../context/settingsContext";
import useFetch from "../../Components/useFetch/useFetch";
import { AuthContext } from "../../context/authProvider";
import {
  Box,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
function PomodoroPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [sessionCount, setSessionCount] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [duration, setDuration] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const { userInfo } = useContext(AuthContext);
  const userId = userInfo && userInfo?._id;
  const { data } = useFetch("/tasks/user", userId);
  // console.log(data);
  let tasksList =
    data &&
    data.userTasks
      .filter((e) => {
        return e.status === "To-do" || e.status === "In-Progress";
      })
      .map((e) => ({
        taskName: e.title,
        taskId: e._id,
        duration: e.duration,
      }));

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleTaskSelect = (event) => {
    setSelectedTask(event.target.value);
    console.log(event.target.value);
    const selectedTask = event.target.value;

    const selectedOption = tasksList.find(
      (option) => option.taskName === selectedTask
    );
    const selectedId = selectedOption ? selectedOption.taskId : null;
    const selectedDuration = selectedOption ? selectedOption.duration : null;
    setSelectedTaskId(selectedId);
    setDuration(selectedDuration);
  };

  // console.log(tasksList);
  return (
    <>
      <div>
        <settingsContext.Provider
          value={{
            workMinutes,
            breakMinutes,
            duration,
            sessionCount,
            setSessionCount,
            totalSessions,
            setTotalSessions,
            setDuration,
            setBreakMinutes,
            setWorkMinutes,
          }}
        >
          <div
            className="pomodoroPage"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="leftSide">
              <div className="taskPicker">
                <div className="heading">
                  <Typography sx={{ color: "var(--blue2}" }}>
                    Select Task To Work On
                  </Typography>
                </div>
                <Select
                  labelId="priority-select-label"
                  id="priority-select"
                  value={selectedTask}
                  size="small"
                  onChange={handleTaskSelect}
                  sx={{ width: "320px" }}
                  input={<OutlinedInput id="select-priority" />}
                  renderValue={(selected) => {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          maxWidth: "280px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: "500",
                            textWrap: "balance",
                            justifyContent: "space-around",
                          }}
                        >
                          {selected}
                          <div>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                fontWeight: "300",
                                color: "GrayText",
                                justifyContent: "flex-end",
                              }}
                            >
                              <AccessTimeIcon sx={{ width: "16px" }} />{" "}
                              {duration}
                              min
                            </span>
                          </div>
                        </div>
                      </Box>
                    );
                  }}
                  MenuProps={MenuProps}
                >
                  {tasksList &&
                    tasksList.map((option, index) => (
                      <MenuItem key={index} value={option.taskName}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: "500",
                            textWrap: "balance",
                            justifyContent: "space-around",
                          }}
                        >
                          {option.taskName}
                          <div>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                fontWeight: "300",
                                color: "GrayText",
                                justifyContent: "flex-end",
                              }}
                            >
                              <AccessTimeIcon sx={{ width: "16px" }} />{" "}
                              {option.duration}min
                            </span>
                          </div>
                        </div>
                      </MenuItem>
                    ))}
                </Select>
              </div>
              <div style={{ marginTop: "20px" }}>
                <p>Total Sessions: {totalSessions}</p>
                <p>Sessions Remaining: {totalSessions - sessionCount}</p>
              </div>
            </div>
            <div className="rightSide">
              <div className="timer">
                <PomodoroTimer selectedtaskId={selectedTaskId} />
              </div>
            </div>
          </div>
        </settingsContext.Provider>
      </div>
    </>
  );
}

export default PomodoroPage;
