import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  TextField,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SmallButton from "../SmallButton/SmallButton";
import SmallOutlined from "../SmallButton/SmallOutlined";
import axios from "axios";
import Cookies from "js-cookie";
import { TwitterPicker } from "react-color";
import { toast } from "react-hot-toast";


function AddLabel(props) {
  const [labelName, setLabelName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const handleNameChange = (event) => {
    setLabelName(event.target.value);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };
 
 const handleSubmit = (event) => {
    event.preventDefault();
    const token = Cookies.get("userToken");
    const userId = Cookies.get("passport");
    const newLabel = {
        name: labelName,
        color: selectedColor.split("#")[1],
        user: userId,
    }
    console.log(newLabel)
    axios
      .post(
        `${process.env.REACT_APP_URL}/label/new/`, newLabel,
        
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
          console.log(response);
          toast.success(response.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        console.log(err.message);
      });
    props.onClose();

  };

  return (
    <>
      <Dialog open={props.open}>
        <DialogTitle
          sx={{
            color: "var(--blue2)",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LocalOfferIcon sx={{ fontSize: "14px" }} />
          Add New Label
        </DialogTitle>
        <DialogContent>
          <form style={{ width: "320px" }}>
            <TextField
              autoFocus
              placeholder="Label Name Here"
              variant="standard"
              onChange={handleNameChange}
              value={labelName}
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
              id="color"
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                justifyContent: "space-around",
                marginBottom: "10px",
              }}
            >
              <InputLabel
                sx={{
                  marginBottom: "10px",
                  fontWeight: "500",
                  fontSize: "14px",
                  color: "var(--blue2)",
                }}
              >
                Label Color
              </InputLabel>
              <TwitterPicker
                color={selectedColor}
                onChange={handleColorChange}
              />
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

export default AddLabel;
