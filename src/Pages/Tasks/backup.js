import React, { useContext, useEffect, useState } from "react";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AuthContext } from "../../context/authProvider";
import useFetch from "../../Components/useFetch/useFetch";

import TaskHeading from "../../Components/TaskHeading/TaskHeading";
import TaskNavPanel from "../../Components/NavPanel/TaskNavPanel";
import AddNewTask from "../../Components/AddNewTask/AddNewTask";
import AddLabel from "../../Components/AddLabel/AddLabel";
import DeleteLabel from "../../Components/DeleteLabel/DeleteLabel";
import DataNotFound from "../../Components/NotFound/DataNotFound";
import Loading from "../../Components/Loading/Loading";
import axios from "axios";
import styles from "./tasks.module.css";
import { toast } from "react-hot-toast";
import TaskCard from "../../Components/TaskCard/backup";
import DroppableColumn from "../../Components/DroppableColumn/DroppableColumn";

function Tasks() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [labelDialogOpen, setLabelDialogOpen] = useState(false);
  const [deleteLabelOpen, setDeleteLabelOpen] = useState(false);
  const [buttonType, setButtonType] = useState("checkbox");
  const [activeId, setActiveId] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const { userInfo, token } = useContext(AuthContext);
  const userId = userInfo?._id;

  const { data, reFetch, loading } = useFetch("/tasks/user", userId);

  const [columns, setColumns] = useState({
    "To-do": [],
    "In-Progress": [],
    Done: [],
  });


  useEffect(() => {
    if (!data?.userTasks) return;

    const grouped = {
      "To-do": [],
      "In-Progress": [],
      Done: [],
    };

    for (const task of data.userTasks) {
      grouped[task.status]?.push(task);
    }

    setColumns(grouped);
  }, [data?.userTasks]);

  const handleDragEnd = async ({ active, over }) => {
    setActiveId(null);
    setActiveTask(null);
    console.log(over);
    console.log(active);
    if (!over) return;

    const taskId = active.id;
    const overId = over.id;

    // Determine source column
    const sourceColumn = Object.keys(columns).find((key) =>
      columns[key].some((t) => t._id === taskId)
    );

    // Determine if we dropped on a column or a task
    let targetColumn;
    if (columns[overId]) {
      // Dropped directly on a column
      targetColumn = overId;
    } else {
      // Dropped on a task — find which column it’s in
      targetColumn = Object.keys(columns).find((key) =>
        columns[key].some((t) => t._id === overId)
      );
    }

    if (!sourceColumn || !targetColumn || sourceColumn === targetColumn) return;

    const movingTask = columns[sourceColumn].find((t) => t._id === taskId);

    const newColumns = { ...columns };
    newColumns[sourceColumn] = newColumns[sourceColumn].filter(
      (t) => t._id !== taskId
    );
    newColumns[targetColumn] = [movingTask, ...newColumns[targetColumn]];

    setColumns(newColumns);

    try {
      await axios.put(
        `${process.env.REACT_APP_URL}/tasks/edit/${taskId}`,
        { status: targetColumn },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Task status updated");
      reFetch();
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleAddSubmit = (newTask) => {
    axios
      .post(`${process.env.REACT_APP_URL}/tasks/new`, newTask, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Task added successfully");
        reFetch();
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <TaskNavPanel
            title="Tasks List"
            addNewTask={() => setDialogOpen(true)}
            addNewLabel={() => setLabelDialogOpen(true)}
            deleteLabel={() => setDeleteLabelOpen(true)}
            buttonType={buttonType}
            buttonTypeChange={setButtonType}
            panelType="tasks"
          />
          <AddNewTask
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onSubmit={handleAddSubmit}
          />
          <AddLabel
            open={labelDialogOpen}
            onClose={() => setLabelDialogOpen(false)}
            reFetching={reFetch}
          />
          <DeleteLabel
            open={deleteLabelOpen}
            onClose={() => setDeleteLabelOpen(false)}
          />

          {data?.userTasks?.length === 0 ? (
            <DataNotFound type="Tasks" />
          ) : (
            <DndContext
              collisionDetection={closestCenter}
              onDragStart={({ active }) => {
                setActiveId(active.id);
                const task = Object.values(columns)
                  .flat()
                  .find((t) => t._id === active.id);
                setActiveTask(task);
              }}
              onDragEnd={handleDragEnd}
              onDragCancel={() => {
                setActiveId(null);
                setActiveTask(null);
              }}
            >
              <div className={styles.Tasks}>
                {Object.entries(columns).map(([status, tasks]) => (
                  <DroppableColumn key={status} id={status}>
                    <div className={styles[`${status.replace("-", "")}Tasks`]}>
                      <TaskHeading title={status} counter={tasks.length} />
                      <SortableContext
                        items={tasks.map((t) => t._id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className={styles.listOfTasks}>
                          {tasks.map((task) => (
                            <TaskCard
                              key={task._id}
                              id={task._id}
                              title={task.title}
                              dueDate={task.dueDate}
                              duration={task.duration}
                              priority={task.priority}
                              status={task.status}
                              labels={task.labels}
                              buttonType={buttonType}
                              changingStatus={reFetch}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </div>
                  </DroppableColumn>
                ))}
              </div>
              <DragOverlay>
                {activeTask ? (
                  <TaskCard
                    id={activeTask._id}
                    title={activeTask.title}
                    dueDate={activeTask.dueDate}
                    duration={activeTask.duration}
                    priority={activeTask.priority}
                    status={activeTask.status}
                    labels={activeTask.labels}
                    buttonType={buttonType}
                    changingStatus={reFetch}
                  />
                ) : null}
              </DragOverlay>
            </DndContext>
          )}
        </>
      )}
    </div>
  );
}

export default Tasks;
