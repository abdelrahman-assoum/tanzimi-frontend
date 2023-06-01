import React, { useRef, useState } from "react";
import styles from "./journalcard.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { TextField } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

function JournalCard(props) {
  const [journalContent, setJournalContent] = useState(props.content);
  const [doneCheck, setDoneCheck] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const typingRef = useRef(props.typing || false);
  const IdRef = useRef(props.cardId);
  //
  const token = Cookies.get("userToken");
  const userId = Cookies.get("passport");
  // const
  // const newJournal = useRef(false);
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const formattedDate = props.journalDate.toLocaleDateString("en-US", options);


  const handleJorunalContent = (e) => {
    let content = e.target.value;
    setJournalContent(content);
  };
  const handleEditSubmit = () => {
    const editedNote = {
      content: journalContent,
    };
    props &&
      editedNote &&
      axios
        .put(
          `${process.env.REACT_APP_URL}/journal/edit/${props.cardId}`,
          editedNote,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          props.actions(null);
          props.reFetching();
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleAddSubmit = () => {
    const color = props.cardColor;
    const newJournal = {
      content: journalContent,
      color: color,
      user: userId,
    };
    axios.post(`${process.env.REACT_APP_URL}/journal/new`, newJournal, {
      headers: { Authorization: `Bearer ${token}`}
    }).then((res)=> {
      console.log(res)
      toast.success('Note Created Successfully');
      props.reFetching();
    }).catch((err)=> {
      console.log(err)
      toast.error(err.message);
    });

    props.hideNew()
  }
  const handleEditClick = (e) => {
    typingRef.current = true;
    // doneRef.current = true;
    // console.log(doneRef)
    setDoneCheck(true);
  };
  // console.log(props);
  return (
    <div>
      <div
        className={styles.journalCard}
        style={{ backgroundColor: props.cardColor }}
      >
        <TextField
          id="journal-content-input"
          value={journalContent}
          multiline
          autoFocus={typingRef.current ? true : false}
          maxRows={6}
          onChange={handleJorunalContent}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            readOnly: !typingRef.current ? true : false,
          }}
        />

        <div className={styles.journalInfo}>
          <span className={styles.journalDate}>{formattedDate}</span>
          <div
            style={{ cursor: "pointer" }}
            className={
              props.buttonType && props.buttonType !== null
                ? styles.iconCircle
                : ""
            }
          >
            {props.buttonType === "edit" ? (
              doneCheck ? (
                <DoneIcon onClick={handleEditSubmit} />
              ) : (
                <EditIcon onClick={handleEditClick} />
              )
            ) : props.new ? (
              <div className={styles.iconCircle}>
                <DoneIcon onClick={handleAddSubmit} />
              </div>
            ) : props.buttonType === "delete" ? (
              <div style={{ height: "24px" }}>
                <DeleteIcon
                  onClick={() => {
                    setDeleteDialogOpen(true);
                  }}
                />
                <DeleteDialog
                  open={deleteDialogOpen}
                  dialogTitle="Note"
                  onClose={() => {
                    setDeleteDialogOpen(false);
                    props.actions(null);
                  }}
                  deleteId={props.cardId}
                  reFetching={props.reFetching}
                  url="/journal/delete/"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JournalCard;
