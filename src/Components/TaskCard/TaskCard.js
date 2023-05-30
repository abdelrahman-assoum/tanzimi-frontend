import React, { useState } from "react";
import Label from "../Labels/Label";
import styles from "./taskcard.module.css";
import CheckboxIcon from "../CheckboxIcon/CheckboxIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

function TaskCard(props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  }
  return (
    <>
      <div className={styles.taskComponent} id={props.id}>
        <div className={styles.taskDescription}>
          <h4 className={styles.taskName}>{props.title}</h4>
          <div className={styles.taskInfo}>
            <div className={styles.taskDay}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                <path d="M180 976q-24 0-42-18t-18-42V296q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600V486H180v430Zm0-490h600V296H180v130Zm0 0V296v130Zm300 230q-17 0-28.5-11.5T440 616q0-17 11.5-28.5T480 576q17 0 28.5 11.5T520 616q0 17-11.5 28.5T480 656Zm-160 0q-17 0-28.5-11.5T280 616q0-17 11.5-28.5T320 576q17 0 28.5 11.5T360 616q0 17-11.5 28.5T320 656Zm320 0q-17 0-28.5-11.5T600 616q0-17 11.5-28.5T640 576q17 0 28.5 11.5T680 616q0 17-11.5 28.5T640 656ZM480 816q-17 0-28.5-11.5T440 776q0-17 11.5-28.5T480 736q17 0 28.5 11.5T520 776q0 17-11.5 28.5T480 816Zm-160 0q-17 0-28.5-11.5T280 776q0-17 11.5-28.5T320 736q17 0 28.5 11.5T360 776q0 17-11.5 28.5T320 816Zm320 0q-17 0-28.5-11.5T600 776q0-17 11.5-28.5T640 736q17 0 28.5 11.5T680 776q0 17-11.5 28.5T640 816Z" />
              </svg>
              <h6>{props.dueDate.split("T")[0]}</h6>
            </div>
            <div className={styles.taskTime}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="m627-287 45-45-159-160v-201h-60v225l174 181ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-82 31.5-155t86-127.5Q252-817 325-848.5T480-880q82 0 155 31.5t127.5 86Q817-708 848.5-635T880-480q0 82-31.5 155t-86 127.5Q708-143 635-111.5T480-80Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480-820q-140 0-240 100T140-480q0 140 100 240t240 100Z" />
              </svg>
              <h6>{props.duration}min</h6>
            </div>
          </div>
          <div className={styles.taskLabels}>
            {props.labels &&
              props.labels.map((e) => (
                <Label
                  key={e.name}
                  id={e._id}
                  labelName={e.name}
                  color={`#${e.color}`}
                />
              ))}
          </div>
        </div>
        <div className={styles.taskCheck}>
          {props.buttonType === "checkbox" ? (
            <CheckboxIcon
              variant={props.status}
              taskId={props.id}
              changingStatus={props.changingStatus}
            />
          ) : props.buttonType === "edit" ? (
            <>
              <EditIcon className={styles.taskEditIcon} />
            </>
          ) : props.buttonType === "delete" ? (
            <div className={styles.taskDeleteIcon}>
              <DeleteIcon
                onClick={() => {
                  setDeleteDialogOpen(true);
                }}
              />
              <DeleteDialog
                open={deleteDialogOpen}
                onClose={handleDeleteDialogClose}
                taskId={props.id}
                changingStatus={props.changingStatus}
              />
            </div>
          ) : (
            <CheckboxIcon
              variant={props.status}
              taskId={props.id}
              changingStatus={props.changingStatus}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default TaskCard;
