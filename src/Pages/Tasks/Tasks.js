import React, { useContext, useState } from "react";
import AddNewTask from "../../Components/AddNewTask/AddNewTask";
import useFetch from "../../Components/useFetch/useFetch";
import TaskCard from "../../Components/TaskCard/TaskCard";
import styles from "./tasks.module.css";
import { toast } from "react-hot-toast";
import TaskHeading from "../../Components/TaskHeading/TaskHeading";
import axios from "axios";
import AddLabel from "../../Components/AddLabel/AddLabel";
import TaskNavPanel from "../../Components/NavPanel/TaskNavPanel";
import Loading from "../../Components/Loading/Loading";
import DeleteLabel from "../../Components/DeleteLabel/DeleteLabel";
import { AuthContext } from "../../context/authProvider";

function Tasks() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [labelDialogOpen, setLabelDialogOpen] = useState(false);
  const [deleteLabelOpen, setDeleteLabelOpen] = useState(false);

  const [buttonType, setButtonType] = useState("checkbox");
  const { userInfo, token } = useContext(AuthContext);
  const userId = userInfo && userInfo?._id;
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleLabelDialogOpen = () => {
    setLabelDialogOpen(true);
  };
  const handleLabelDialogClose = () => {
    setLabelDialogOpen(false);
  };
  const handleDeleteLabelOpen = () => {
    setDeleteLabelOpen(true);
  };

  const handleButtonTypeChange = (type) => {
    setButtonType(type);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const { data, isLoading, reFetch } = useFetch("/tasks/user", userId);

  const handleChangingStatus = () => {
    reFetch();
  };
  const todoTask =
    data && data.userTasks
      ? data.userTasks.filter((e, i) => {
          return e.status === "To-do";
        })
      : [];
  const ProgressTask =
    data && data.userTasks
      ? data.userTasks.filter((e, i) => {
          return e.status === "In-Progress";
        })
      : [];

  const DoneTask =
    data && data.userTasks
      ? data.userTasks.filter((e, i) => {
          return e.status === "Done";
        })
      : [];
  const handleAddSubmit = (newTask) => {
    if (token) {
      axios
        .post(`${process.env.REACT_APP_URL}/tasks/new/`, newTask, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          toast.success("Task added successfully");
          reFetch();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <TaskNavPanel
              title="Tasks List"
              addNewTask={handleDialogOpen}
              addNewLabel={handleLabelDialogOpen}
              deleteLabel={handleDeleteLabelOpen}
              buttonType={buttonType}
              buttonTypeChange={handleButtonTypeChange}
              panelType="tasks"
            />
            <AddNewTask
              open={dialogOpen}
              onClose={handleDialogClose}
              onSubmit={handleAddSubmit}
            />
            <AddLabel
              open={labelDialogOpen}
              onClose={handleLabelDialogClose}
              reFetching={handleChangingStatus}
            />
            <DeleteLabel
              open={deleteLabelOpen}
              onClose={() => setDeleteLabelOpen(false)}
            />
            <div className={styles.Tasks}>
              <div className={styles.ToDoTasks}>
                {todoTask && (
                  <TaskHeading title="To-do" counter={todoTask.length} />
                )}
                <div className={styles.listOfTasks}>
                  {todoTask &&
                    todoTask.map((e, i) => (
                      <TaskCard
                        key={i}
                        id={e._id}
                        title={e.title}
                        dueDate={e.dueDate}
                        duration={e.duration}
                        status={e.status}
                        labels={e.labels}
                        priority={e.priority}
                        buttonType={buttonType}
                        changingStatus={handleChangingStatus}
                      />
                    ))}
                </div>
              </div>
              <div className={styles.ProgressTasks}>
                {ProgressTask && (
                  <TaskHeading
                    title="In-Progress"
                    counter={ProgressTask.length}
                  />
                )}
                <div className={styles.listOfTasks}>
                  {ProgressTask &&
                    ProgressTask.map((e, i) => (
                      <TaskCard
                        key={i}
                        id={e._id}
                        title={e.title}
                        dueDate={e.dueDate}
                        duration={e.duration}
                        priority={e.priority}
                        status={e.status}
                        labels={e.labels}
                        buttonType={buttonType}
                        changingStatus={handleChangingStatus}
                      />
                    ))}
                </div>
              </div>
              <div className={styles.DoneTasks}>
                {DoneTask && (
                  <TaskHeading title="Done" counter={DoneTask.length} />
                )}
                <div className={styles.listOfTasks}>
                  {DoneTask &&
                    DoneTask.map((e, i) => (
                      <TaskCard
                        key={i}
                        id={e._id}
                        title={e.title}
                        priority={e.priority}
                        dueDate={e.dueDate}
                        duration={e.duration}
                        status={e.status}
                        labels={e.labels}
                        buttonType={buttonType}
                        changingStatus={handleChangingStatus}
                      />
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Tasks;
