import React, { useState } from "react";
import AddNewTask from "../../Components/AddNewTask/AddNewTask";
import useFetch from "../../Components/useFetch/useFetch";
import TaskCard from "../../Components/TaskCard/TaskCard";
import Cookies from "js-cookie";
import styles from "./tasks.module.css";
import { Toaster, toast } from "react-hot-toast";
import TaskHeading from "../../Components/TaskHeading/TaskHeading";
import axios from "axios";
import AddLabel from "../../Components/AddLabel/AddLabel";
import TaskNavPanel from "../../Components/NavPanel/TaskNavPanel";

function Tasks() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [labelDialogOpen, setLabelDialogOpen] = useState(false);
  const userId = Cookies.get("passport");
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleLabelDialogOpen = () => {
    setLabelDialogOpen(true);
  };
  const handleLabelDialogClose = () => {
    setLabelDialogOpen(false);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const { data, isLoading, reFetch } = useFetch("/tasks/user", userId);
  console.log(data);
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
    const token = Cookies.get("userToken");
    axios
      .post(`${process.env.REACT_APP_URL}/tasks/new/`, newTask, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
      })
      .then(() => {
        toast.success("Task added successfully");
        reFetch();
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.message);
      });
  };
  console.log(todoTask);
  console.log(DoneTask);
  console.log(ProgressTask);

  return (
    <>
      <div>
        <Toaster />
        <TaskNavPanel
          title="Tasks List"
          addNewTask={handleDialogOpen}
          addNewLabel={handleLabelDialogOpen}
        />
        <AddNewTask
          open={dialogOpen}
          onClose={handleDialogClose}
          onSubmit={handleAddSubmit}
        />
        <AddLabel open={labelDialogOpen} onClose={handleLabelDialogClose} />
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
                  />
                ))}
            </div>
          </div>
          <div className={styles.ProgressTasks}>
            {ProgressTask && (
              <TaskHeading title="In-Progress" counter={ProgressTask.length} />
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
                    status={e.status}
                    labels={e.labels}
                  />
                ))}
            </div>
          </div>
          <div className={styles.DoneTasks}>
            {DoneTask && <TaskHeading title="Done" counter={DoneTask.length} />}
            <div className={styles.listOfTasks}>
              {DoneTask &&
                DoneTask.map((e, i) => (
                  <TaskCard
                    key={i}
                    id={e._id}
                    title={e.title}
                    dueDate={e.dueDate}
                    duration={e.duration}
                    status={e.status}
                    labels={e.labels}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tasks;
