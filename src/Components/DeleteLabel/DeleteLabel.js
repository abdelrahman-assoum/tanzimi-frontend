import React, { useContext, useState } from "react";
import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import SmallButton from "../SmallButton/SmallButton";
import SmallOutlined from "../SmallButton/SmallOutlined";
import axios from "axios";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { toast } from "react-hot-toast";
import useFetch from "../useFetch/useFetch";
import { AuthContext } from "../../context/authProvider";

function DeleteLabel(props) {
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
  const {userInfo, token} = useContext(AuthContext)
  const userId = userInfo && userInfo._id;
  const { data, reFetch } = useFetch("/label/user", userId);
  const labelOptions =
    data?.userLabel?.map((e, i) => {
      return {
        name: e.name,
        color: e.color,
        id: e._id,
      };
    }) || [];
  const [label, setLabel] = useState("");
  const [labelId, setLabelId] = useState("");

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
    const selectedLabel = event.target.value; // Assuming selectedLabels is a single string like "label1"

    const selectedOption = labelOptions.find(
      (option) => option.name === selectedLabel
    );
    const selectedLabelId = selectedOption ? selectedOption.id : null;

    console.log(selectedLabelId);

    // Store the selected label IDs in an array state
    setLabelId(selectedLabelId); // Replace `setSelectedLabelIds` with your state update function
  };

  const handleDelete = (event) => {
    event.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_URL}/label/delete/${labelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log(response);
        // console.log(props);
        reFetch();
        toast.success(response.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
    props.onClose();
  };

  return (
    <>
    
      <div>
        <Dialog
          open={props.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Label"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Choose a label to delete it
            </DialogContentText>
            <div
              id="label-picker"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocalOfferIcon sx={{ color: "#777", marginRight: "5px" }} />
              <Select
                labelId="label-select-label"
                id="label-select"
                value={label}
                size="small"
                fullWidth={true}
                onChange={handleLabelChange}
                // sx={{ width: "160px" }}
                input={<OutlinedInput id="select-priority" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    <Chip
                      key={selected}
                      label={selected}
                      sx={{
                        backgroundColor: hexToRGBA(
                          getLabelColor(selected, labelOptions),
                          0.2
                        ),
                        color: getLabelColor(selected, labelOptions),
                      }}
                    />
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
          </DialogContent>
          <DialogActions>
            <SmallOutlined onClick={props.onClose} title="No" />
            <SmallButton onClick={handleDelete} title="Yes" />
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default DeleteLabel;

function getColor(index, options) {
  const selectedOptions = options.filter((option) =>
    index.includes(option.value)
  );
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
