import React from "react";
import styles from './journalcard.module.css'
import EditIcon from "@mui/icons-material/Edit";
function JournalCard(props) {
  return (
    <div>
      <div className={styles.journalCard} style={{ backgroundColor: "" }}>
        <p className={styles.journalParagraph}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam
          corrupti tenetur nulla asperiores iusto eos nam suscipit neque
          distinctio amet. Quia atque saepe eaque dolorum sunt autem eveniet at?
          Vitae.
        </p>
        <div className={styles.journalInfo}>
          <span className={styles.journalDate}>{props.journalDate}</span>
          <div className={styles.editCircle}>
            <EditIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JournalCard;
