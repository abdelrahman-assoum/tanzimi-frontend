import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Label from "../Labels/Label";
import styles from "./taskcard.module.css";
import CheckboxIcon from "../CheckboxIcon/CheckboxIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import EditTask from "../EditTask/EditTask";
import clsx from "clsx"; // Optional utility for class merging

function TaskCard(props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
    boxShadow: isDragging
      ? "0 4px 12px rgba(0, 0, 0, 0.15)"
      : "0 1px 3px rgba(0, 0, 0, 0.1)",
    zIndex: isDragging ? 1000 : "auto",
  };

  return (
    <>
      <div
        className={clsx(styles.taskComponent, isDragging && styles.dragging)}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className={styles.taskDescription}>
          <h4 className={styles.taskName}>{props.title}</h4>
          <div className={styles.taskInfo}>
            <div className={styles.taskDay}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                <path d="..." />
              </svg>
              <h6>{props.dueDate?.split("T")[0]}</h6>
            </div>
            <div className={styles.taskTime}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="..." />
              </svg>
              <h6>{props.duration}min</h6>
            </div>
          </div>
          <div className={styles.taskLabels}>
            {props.labels?.map((e) => (
              <Label
                key={e._id}
                id={e._id}
                labelName={e.name}
                color={`#${e.color}`}
              />
            ))}
          </div>
        </div>
        <div
          className={styles.taskCheck}
          data-dnd-kit-disabled-draggable
          onPointerDown={(e) => e.stopPropagation()}
        >
          {props.buttonType === "checkbox" ? (
            <CheckboxIcon
              variant={props.status}
              taskId={props.id}
              changingStatus={props.changingStatus}
            />
          ) : props.buttonType === "edit" ? (
            <>
              <EditIcon
                className={styles.taskEditIcon}
                onClick={() => setEditDialogOpen(true)}
              />
              <EditTask
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                taskId={props.id}
                changingStatus={props.changingStatus}
                title={props.title}
                status={props.status}
                priority={props.priority}
                labels={props.labels}
                duration={props.duration}
                dueDate={props.dueDate}
              />
            </>
          ) : props.buttonType === "delete" ? (
            <div className={styles.taskDeleteIcon}>
              <DeleteIcon
                onClick={() => setDeleteDialogOpen(true)}
              />
              <DeleteDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                deleteId={props.id}
                dialogTitle="Task"
                reFetching={props.changingStatus}
                url="/tasks/delete/"
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
