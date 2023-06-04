import React, { useContext, useState } from "react";
import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useTheme } from "@mui/material";
import SmallButton from "../SmallButton/SmallButton";
import SmallOutlined from "../SmallButton/SmallOutlined";
import useFetch from "../useFetch/useFetch";
import { AuthContext } from "../../context/authProvider";
// import { useTheme } from "@emotion/react";
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


function AddNewGoal(props) {
  const theme = useTheme();
  const [goalName, setGoalName] = useState("");
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );


  const [tasks, setTasks] = useState([]);
  const [tasksId, setTasksId] = useState([]);
  const { userInfo } = useContext(AuthContext);
  const userId = userInfo && userInfo._id;

  const { data } = useFetch("/tasks/user", userId);

  const tasksOptions =
    data?.userTasks
      ?.filter((e) => {
        return e.status === "To-do" || e.status === "In-Progress";
      })
      .map((e, i) => {
        return {
          name: e.title,
          id: e._id,
        };
      }) || [];
    // console.log(data)
    // console.log(tasksOptions)
  const handleNameChange = (event) => {
    setGoalName(event.target.value);
  };
  
  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };
  const handleTaskChange = (event) => {
    setTasks(event.target.value);
    const selectedTasks = event.target.value;
    const selectedTasksId = selectedTasks.map((label) => {
      const selectedOption = tasksOptions.find(
        (option) => option.name === label
      );
      return selectedOption.id;
    });

    // Store the selected label IDs in an array state
    setTasksId(selectedTasksId); // Replace `setSelectedLabelIds` with your state update function
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newGoal = {
      name: goalName,
      dueDate: dueDate,
      tasks: tasksId,
      user: userId,
    };
    props.onSubmit(newGoal);

    props.onClose();
  };
  return (
    <>
      <Dialog open={props.open}>
        <DialogTitle sx={{ color: "var(--blue2)", fontSize: "14px" }}>
          Add New Goal
        </DialogTitle>
        <DialogContent>
          <form style={{ width: "320px" }}>
            <TextField
              autoFocus
              placeholder="Goal Title Here"
              variant="standard"
              onChange={handleNameChange}
              value={goalName}
              InputProps={{
                style: {
                  fontSize: "24px", // Specify the desired font size
                  fontWeight: "600",
                },
              }}
              required={true}
              sx={{ marginBottom: "20px", width: "100%", fontSize: "64px" }}
            />
            <div
              id="dueDate"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div
                id="dueDate-picker"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <DateRangeIcon sx={{ color: "#777", marginRight: "5px" }} />
                <h4 style={{ fontWeight: "500", color: "#777" }}>Due Date</h4>
              </div>
              <TextField
                type="date"
                value={dueDate}
                sx={{ width: "160px" }}
                variant="outlined"
                onChange={handleDueDateChange}
                required
              />
            </div>
            <div
              id="tasls"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div
                id="tasks-picker"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LocalOfferIcon sx={{ color: "#777", marginRight: "5px" }} />
                <h4 style={{ fontWeight: "500", color: "#777" }}>Tasks</h4>
              </div>
              <Select
                labelId="label-select-label"
                id="label-select"
                value={tasks}
                size="small"
                multiple
                onChange={handleTaskChange}
                sx={{ width: "160px" }}
                input={<OutlinedInput id="select-priority" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => {
                      return (
                        <Chip
                          key={value}
                          label={value}
               
                        />
                      );
                    })}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {tasksOptions.map((option) => (
                  <MenuItem
                    key={option.id}
                    id={option.id}
                    value={option.name}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <SmallOutlined title="Close" onClick={props.onClose} />
          <SmallButton title="+ Add" onClick={handleSubmit} />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddNewGoal;

