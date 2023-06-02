import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SmallButton from "../SmallButton/SmallButton";
import SmallOutlined from "../SmallButton/SmallOutlined";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/authProvider";

function DeleteDialog(props) {

  const {token} = useContext(AuthContext)
  const handleDelete = (event) => {
    event.preventDefault();
    if(token) {
    axios
      .delete(`${process.env.REACT_APP_URL}${props.url}${props.deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(response.data.message);
        props.reFetching();
      })
      .catch((err) => {
        toast.error(err.message);
      });
    props.onClose();
    }
  };

  return (
    <>
      <div>
        <Dialog
          open={props.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
          {`Delete this ${props.dialogTitle}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to delete this ${props.dialogTitle} ?`}
            </DialogContentText>
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

export default DeleteDialog;
