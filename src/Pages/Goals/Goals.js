import React, { useContext, useState } from "react";
import NavPanel from "../../Components/NavPanel/NavPanel";
import AddNewGoal from "../../Components/AddNewGoal/AddNewGoal";
import useFetch from "../../Components/useFetch/useFetch";
import { AuthContext } from "../../context/authProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import GoalCard from "../../Components/GoalCard/GoalCard";
import Loading from "../../Components/Loading/Loading";
import styles from './goals.module.css'
import DataNotFound from "../../Components/NotFound/DataNotFound";


function Goals() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [buttonType, setButtonType] = useState(null);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const {userInfo, token} = useContext(AuthContext)
  const userId = userInfo && userInfo?._id

  const {data, isLoading, reFetch} = useFetch('/goal/user', userId)
  console.log(data)

  const handleChangeButtonType = (type) => {
    setButtonType(type);
  };

  const handleAddNewGoal = (newGoal) => {
     if (token) {
      axios
        .post(`${process.env.REACT_APP_URL}/goal/new/`, newGoal, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          toast.success("Goal added successfully");
          console.log(res);
          reFetch();
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.message);
        });
    }
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
      <div>
        <div>
          <NavPanel
            title="Goals"
            addClick={handleDialogOpen}
            buttonType={buttonType}
            actions={handleChangeButtonType}
          />
          <AddNewGoal
            open={dialogOpen}
            onClose={handleDialogClose}
            onSubmit={handleAddNewGoal}
          />
        </div>
        <div>
          {data && data.userGoals && data.userGoals.length === 0 ? (
            <DataNotFound type="Goals" />
          ) : (
            <div className={styles.goalsCards}>
              {data &&
                data.userGoals.map((e, i) => {
                  return (
                    <GoalCard
                      tasks={e.tasks}
                      name={e.name}
                      dueDate={e.dueDate}
                      goalId={e._id}
                      key={i}
                      refetching={reFetch}
                      buttonType={buttonType}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </div>
       )} 
    </>
  );
}

export default Goals;
