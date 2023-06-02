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
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useTheme } from "@mui/material";
import SmallButton from "../SmallButton/SmallButton";
import SmallOutlined from "../SmallButton/SmallOutlined";
import axios from "axios";
// import Cookies from "js-cookie";
import useFetch from "../useFetch/useFetch";
import { toast } from "react-hot-toast";
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

const statusOptions = [
  { value: "To-do", color: "#777" }, // Red color for To-do
  { value: "In-Progress", color: "#0080FB" }, // Blue color for In-Progress
  { value: "Done", color: "#219629" }, // Green color for Done
];
const priorityOptions = [
  { value: "Low", color: "#0080FB" }, // Blue color for Low
  { value: "Medium", color: "#219629" }, // Green color for Medium
  { value: "High", color: "#D60F0F" }, // Red color for High
];

function EditTask(props) {
  console.log(props);
  //   const theme = useTheme();
  const [taskName, setTaskName] = useState(props.title);
  const [status, setStatus] = useState(props.status);
  const [priority, setPriority] = useState(props.priority);
  const [duration, setDuration] = useState(props.duration);
  const dateFormated = new Date(props.dueDate).toISOString().split("T")[0];
  const [dueDate, setDueDate] = useState(dateFormated);
  const initialLabelIds =
    props.labels &&
    props.labels.map((e, i) => {
      return e._id;
    });
  const initialSelectedLabels =
    props.labels &&
    props.labels.map((e, i) => {
      return e.name;
    });

  const [label, setLabel] = useState(initialSelectedLabels);
  const [labelId, setLabelId] = useState(initialLabelIds);
  const { token, userInfo } = useContext(AuthContext);

  const userId = userInfo && userInfo._id;

  const { data } = useFetch("/label/user", userId);

  const labelOptions =
    data?.userLabel?.map((e, i) => {
      return {
        name: e.name,
        color: e.color,
        id: e._id,
      };
    }) || [];
  // console.log(labelOptions);
  const handleNameChange = (event) => {
    setTaskName(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleDurationChange = (event) => {
    let value = event.target.value;
    setDuration(value);
  };
  const handleDurationRound = (event) => {
    let value = event.target.value;
    if (value !== "") {
      value = Math.round(Number(value) / 5) * 5; // Round to the nearest multiple of 5
    }
    setDuration(value);
  };
  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };
  const handleLabelChange = (event) => {
    setLabel(event.target.value);
    const selectedLabels = event.target.value;
    const selectedLabelIds = selectedLabels.map((label) => {
      const selectedOption = labelOptions.find(
        (option) => option.name === label
      );
      return selectedOption.id;
    });

    // Store the selected label IDs in an array state
    setLabelId(selectedLabelIds); // Replace `setSelectedLabelIds` with your state update function
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const editedTask = {
      title: taskName,
      duration: duration,
      status: status,
      priority: priority,
      dueDate: dueDate,
      user: userId,
      labels: labelId,
    };
    const taskId = props.taskId;
    if (token) {
      axios
        .put(`${process.env.REACT_APP_URL}/tasks/edit/${taskId}`, editedTask, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          toast.success("Task edited successfully");
          props.changingStatus();
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err.message);
        });

      props.onClose();
    }
  };
  return (
    <>
      {props && (
        <Dialog open={props.open}>
          <DialogTitle sx={{ color: "var(--blue2)", fontSize: "14px" }}>
            Edit Task
          </DialogTitle>
          <DialogContent>
            <form style={{ width: "320px" }}>
              <TextField
                autoFocus
                placeholder="Task Name Here"
                variant="standard"
                onChange={handleNameChange}
                value={taskName}
                InputProps={{
                  style: {
                    fontSize: "24px", // Specify the desired font size
                    fontWeight: "600",
                  },
                }}
                required
                sx={{ marginBottom: "20px", width: "100%", fontSize: "64px" }}
              />
              <div
                id="status"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: "5px" }}
                  >
                    <path
                      d="M11.5 7.09231C10.969 7.09231 10.5345 6.65714 10.5345 6.12527V1.96703C10.5345 1.43516 10.969 1 11.5 1C12.031 1 12.4655 1.43516 12.4655 1.96703V6.12527C12.4655 6.65714 12.031 7.09231 11.5 7.09231ZM8.6276 8.03516C9.06208 7.72088 9.15863 7.11648 8.84484 6.68132L6.38278 3.32088C6.06899 2.88571 5.46554 2.78901 5.03106 3.1033C4.59658 3.41758 4.50003 4.02198 4.81382 4.45714L7.25174 7.81758C7.44484 8.08352 7.7345 8.2044 8.02415 8.2044C8.24139 8.22857 8.45863 8.15604 8.6276 8.03516ZM6.8414 10.4769C7.01036 9.96923 6.72071 9.41319 6.21381 9.26813L2.25521 7.98681C1.74832 7.81758 1.19315 8.10769 1.04832 8.61538C0.879353 9.0989 1.16901 9.65495 1.6759 9.82418L5.63451 11.1055C5.73106 11.1297 5.82761 11.1538 5.92416 11.1538C6.3345 11.1538 6.69657 10.8879 6.8414 10.4769ZM2.25521 16.0132L6.21381 14.7319C6.72071 14.5626 7.01036 14.0308 6.8414 13.5231C6.67243 13.0154 6.1414 12.7495 5.63451 12.8945L1.6759 14.1758C1.16901 14.3451 0.879353 14.8769 1.04832 15.3846C1.16901 15.7956 1.55521 16.0615 1.96556 16.0615C2.06211 16.0615 2.15866 16.0615 2.25521 16.0132ZM6.38278 20.6791L8.84484 17.3187C9.15863 16.8835 9.06208 16.2791 8.6276 15.9648C8.19312 15.6505 7.58967 15.7473 7.27588 16.1824L4.83796 19.5429C4.52417 19.978 4.62072 20.5824 5.0552 20.8967C5.22416 21.0176 5.41727 21.0901 5.61037 21.0901C5.90002 21.0901 6.18968 20.9451 6.38278 20.6791ZM12.4655 22.033V17.8747C12.4655 17.3429 12.031 16.9077 11.5 16.9077C10.969 16.9077 10.5345 17.3429 10.5345 17.8747V22.033C10.5345 22.5648 10.969 23 11.5 23C12.031 23 12.4655 22.5648 12.4655 22.033ZM17.9689 20.8967C18.4034 20.5824 18.5 19.978 18.1862 19.5429L15.7241 16.1824C15.4103 15.7473 14.8069 15.6505 14.3724 15.9648C13.9379 16.2791 13.8414 16.8835 14.1552 17.3187L16.5931 20.6791C16.7862 20.9451 17.0758 21.0659 17.3655 21.0659C17.5827 21.0901 17.8 21.0176 17.9689 20.8967ZM21.9517 15.4088C22.1206 14.9011 21.831 14.3451 21.3241 14.2L17.3655 12.9187C16.8586 12.7495 16.3034 13.0396 16.1586 13.5473C15.9896 14.0549 16.2793 14.611 16.7862 14.756L20.7448 16.0374C20.8413 16.0615 20.9379 16.0857 21.0344 16.0857C21.4448 16.0615 21.831 15.7956 21.9517 15.4088ZM17.3655 11.1055L21.3241 9.82418C21.831 9.65495 22.1206 9.12308 21.9517 8.61538C21.7827 8.10769 21.2517 7.84176 20.7448 7.98681L16.7862 9.26813C16.2793 9.43736 15.9896 9.96923 16.1586 10.4769C16.2793 10.8879 16.6655 11.1538 17.0758 11.1538C17.1724 11.1538 17.2689 11.1297 17.3655 11.1055ZM15.7241 7.81758L18.162 4.45714C18.4758 4.02198 18.3793 3.41758 17.9448 3.1033C17.5103 2.78901 16.9069 2.88571 16.5931 3.32088L14.1552 6.68132C13.8414 7.11648 13.9379 7.72088 14.3724 8.03516C14.5414 8.15604 14.7345 8.22857 14.9276 8.22857C15.2414 8.22857 15.531 8.08352 15.7241 7.81758Z"
                      fill="#777777"
                    />
                  </svg>
                  <h4 style={{ fontWeight: "500", color: "#777" }}>Status</h4>
                </div>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  value={status}
                  sx={{ width: "160px" }}
                  size="small"
                  onChange={handleStatusChange}
                  input={<OutlinedInput id="select-status" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      <Chip
                        key={selected}
                        label={selected}
                        sx={{
                          backgroundColor: getColor(selected, statusOptions),
                          color: "#fff",
                        }}
                      />
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {statusOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      style={{ color: option.color }}
                    >
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div
                id="priority"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LowPriorityIcon sx={{ color: "#777", marginRight: "5px" }} />
                  <h4 style={{ fontWeight: "500", color: "#777" }}>Priority</h4>
                </div>
                <Select
                  labelId="priority-select-label"
                  id="priority-select"
                  value={priority}
                  size="small"
                  onChange={handlePriorityChange}
                  sx={{ width: "160px" }}
                  input={<OutlinedInput id="select-priority" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      <Chip
                        key={selected}
                        label={selected}
                        sx={{
                          backgroundColor: getColor(selected, priorityOptions),
                          color: "#fff",
                        }}
                      />
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {priorityOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      style={{ color: option.color }}
                    >
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div
                id="duration"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ScheduleIcon sx={{ color: "#777", marginRight: "5px" }} />
                  <h4 style={{ fontWeight: "500", color: "#777" }}>Duration</h4>
                </div>
                <TextField
                  type="number"
                  id="duration-picker"
                  placeholder="Duration"
                  required
                  sx={{ width: "160px" }}
                  value={duration}
                  variant="outlined"
                  onChange={handleDurationChange}
                  onBlur={handleDurationRound}
                  InputProps={{
                    inputProps: {
                      step: 5, // Set the step value to 5
                      min: 5, // Set the minimum value, if needed
                    },
                  }}
                />
              </div>
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
                id="label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div
                  id="label-picker"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LocalOfferIcon sx={{ color: "#777", marginRight: "5px" }} />
                  <h4 style={{ fontWeight: "500", color: "#777" }}>Labels</h4>
                </div>
                <Select
                  labelId="label-select-label"
                  id="label-select"
                  value={label}
                  size="small"
                  multiple
                  onChange={handleLabelChange}
                  sx={{ width: "160px" }}
                  input={<OutlinedInput id="select-priority" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => {
                        const color = getLabelColor(value, labelOptions);
                        return (
                          <Chip
                            key={value}
                            label={value}
                            sx={{
                              color: color,
                              backgroundColor: hexToRGBA(color, 0.2),
                            }}
                          />
                        );
                      })}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {labelOptions.map((option) => (
                    <MenuItem
                      key={option.id}
                      id={option.id}
                      value={option.name}
                      style={{ color: `#${option.color}` }}
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
            <SmallButton title="Edit" onClick={handleSubmit} />
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default EditTask;

function getColor(index, options) {
  const selectedOptions = options.filter((option) =>
    index.includes(option.value)
  );
  //   console.log(selectedOptions.map((option) => option.color));
  return selectedOptions.map((option) => option.color);
}

function getLabelColor(index, options) {
  const selectedOptions = options.filter((option) =>
    index.includes(option.name)
  );
  // console.log(selectedOptions);
  // console.log(selectedOptions.map((option) => option.color));
  return selectedOptions.map((option) => ` #${option.color}`);
}
function hexToRGBA(hex, alpha) {
  const hexValue = Array.isArray(hex) ? hex[0] : hex; // Get the hex value from the array if it's an array
  const sanitizedHex = hexValue?.trim(); // Remove any leading/trailing whitespace
  const hexWithoutHash = sanitizedHex?.substring(1); // Remove the leading hash character (#)
  const r = parseInt(hexWithoutHash?.substring(0, 2), 16); // Parse the red component
  const g = parseInt(hexWithoutHash?.substring(2, 4), 16); // Parse the green component
  const b = parseInt(hexWithoutHash?.substring(4, 6), 16); // Parse the blue component
  return `rgba(${r}, ${g}, ${b}, ${alpha})`; // Return the RGBA value
}

// const labelStyle = {
//   color: props.color,
//   background: hexToRGBA(props.color, backgroundOpacity),
// };
