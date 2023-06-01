import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

import styles from "./tasknavpanel.module.css";
function TaskNavPanel(props) {
  const handleDeleteClicked = () => {
    props.buttonTypeChange("delete");
  };
  const handleCancel = () => {
    props.buttonTypeChange("checkbox");
  };

  const handleEditClicked = () => {
    props.buttonTypeChange("edit");
  };
  return (
    <div>
      <div className={styles.navPanel}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.functions}>
          {props.buttonType === "delete" || props.buttonType === "edit" ? (
            <div className={styles.cancel}>
              {" "}
              <CancelIcon onClick={handleCancel} />{" "}
            </div>
          ) : (
            ""
          )}
          {props.panelType === "tasks" ? (
            <>
              <div className={styles.addLabel} onClick={props.addNewLabel}>
                <svg
                  id="add-label-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.58894 16.6024V13.849H6.50672V16.6024H9.26008V17.5202H6.50672V20.2735H5.58894V17.5202H2.83557V16.6024H5.58894ZM2.8478 12.0257L1 10.1779V2.83522C1 1.81447 1.82166 1 2.83522 1H10.1779L22.4587 13.2808C23.1775 13.9996 23.1811 15.1633 22.4656 15.8787L15.8787 22.4656C15.1643 23.18 14.0001 23.178 13.2808 22.4587L11.0834 20.2613C11.6723 19.3366 12.0134 18.2388 12.0134 17.0613C12.0134 13.7666 9.34255 11.0957 6.04783 11.0957C4.87032 11.0957 3.77249 11.4368 2.8478 12.0257ZM6.04783 7.42451C6.80815 7.42451 7.42451 6.80815 7.42451 6.04783C7.42451 5.28751 6.80815 4.67115 6.04783 4.67115C5.28751 4.67115 4.67115 5.28751 4.67115 6.04783C4.67115 6.80815 5.28751 7.42451 6.04783 7.42451ZM6.04783 22.1091C8.83567 22.1091 11.0957 19.8491 11.0957 17.0613C11.0957 14.2734 8.83567 12.0134 6.04783 12.0134C3.25999 12.0134 1 14.2734 1 17.0613C1 19.8491 3.25999 22.1091 6.04783 22.1091Z"
                  />
                </svg>
              </div>
              <div
                className={styles.deleteLabel}
                onClick={props.deleteLabel}
              >
                <svg
                  id="delete-label-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.8478 12.0257L1 10.1779V2.83522C1 1.81448 1.82166 1 2.83522 1H10.1779L22.4587 13.2808C23.1775 13.9996 23.1811 15.1633 22.4656 15.8787L15.8787 22.4656C15.1643 23.18 14.0001 23.178 13.2808 22.4587L11.0834 20.2613C11.6723 19.3366 12.0134 18.2388 12.0134 17.0613C12.0134 13.7666 9.34255 11.0957 6.04783 11.0957C4.87032 11.0957 3.77249 11.4368 2.8478 12.0257ZM6.04783 7.42451C6.80815 7.42451 7.42451 6.80815 7.42451 6.04783C7.42451 5.28751 6.80815 4.67115 6.04783 4.67115C5.28751 4.67115 4.67115 5.28751 4.67115 6.04783C4.67115 6.80815 5.28751 7.42451 6.04783 7.42451ZM6.04783 22.1091C8.83567 22.1091 11.0957 19.8491 11.0957 17.0613C11.0957 14.2734 8.83567 12.0134 6.04783 12.0134C3.25999 12.0134 1 14.2734 1 17.0613C1 19.8491 3.25999 22.1091 6.04783 22.1091ZM2.83557 16.6024V17.5202H9.26008V16.6024H2.83557Z"
                  />
                </svg>
              </div>
            </>
          ) : (
            ""
          )}
          <div className={styles.addTask} onClick={props.addNewTask}>
            <AddCircleIcon />
          </div>
          <div className={styles.editTask}>
            <EditIcon className={styles.editIcon} onClick={handleEditClicked} />
          </div>
          <div className={styles.deleteTask} onClick={handleDeleteClicked}>
            <DeleteIcon className={styles.deleteIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskNavPanel;
