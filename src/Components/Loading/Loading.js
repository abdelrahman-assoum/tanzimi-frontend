import React from "react";
import styles from "./loading.module.css";

function Loading() {
  return (
    <>
      <div className={styles.center}>
        <div className={styles.customLoader}></div>
      </div>
    </>
  );
}

export default Loading;
