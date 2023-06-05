import React, { useContext, useRef, useState } from "react";
import NavPanel from "../../Components/NavPanel/NavPanel";
import JournalCard from "../../Components/JournalCard/JournalCard";
import styles from "./journalpage.module.css";
import useFetch from "../../Components/useFetch/useFetch";
import Loading from "../../Components/Loading/Loading";
import { AuthContext } from "../../context/authProvider";
import DataNotFound from "../../Components/NotFound/DataNotFound";

function Journals() {
  const [buttonType, setButtonType] = useState(null);
  const [showNewJournal, setShowNewJournal] = useState(false);
  const typingRef = useRef(false);
  const addedDate = new Date();
  const {userInfo} = useContext(AuthContext)
  const userId = userInfo &&  userInfo?._id;
  const {data , isLoading, reFetch} = useFetch('/journal/user', userId)

  const handleRefetch = ()=> {
    reFetch();
  }
  const handleChangeButtonType = (type) => {
    setButtonType(type);
  };

  const handleShowNewJournal = () => {
    setShowNewJournal(true);
    typingRef.current = true;
    setButtonType(null)
  };
  const handleHideNewJournal = () => {
  setShowNewJournal(false);
  }
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <NavPanel
            title="Notes"
            actions={handleChangeButtonType}
            addClick={handleShowNewJournal}
            buttonType={buttonType}
          />
          <div className={styles.journalContainer}>
            {showNewJournal ? (
              <JournalCard
                journalDate={addedDate}
                cardColor={getRandomColor()}
                buttonType={buttonType}
                reFetching={handleRefetch}
                new={true}
                hideNew={handleHideNewJournal}
                typing={typingRef.current}
              />
            ) : (
              ""
            )}
              {data && data.userJournals && data.userJournals.length === 0 ? (
                <DataNotFound type="Notes" />
              ) : (
              <>
                {data &&
                  data.userJournals.map((e, i) => (
                    <JournalCard
                      key={i}
                      buttonType={buttonType}
                      changeType={handleChangeButtonType}
                      journalDate={e.updatedAt || addedDate}
                      content={e.content}
                      actions={handleChangeButtonType}
                      cardId={e._id}
                      reFetching={handleRefetch}
                      cardColor={e.color || getRandomColor()}
                      // typing={typing}
                    />
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Journals;

function getRandomColor() {
  const colors = ["#FFC972", "#FF9B73", "#B692FE", "#D1E243", "#0EC0E4"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}