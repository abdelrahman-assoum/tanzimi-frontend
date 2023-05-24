import React from "react";
import styles from "./small.module.css";

function SmallButton({ title, onClick }) {
  return <button className={styles.smallButton} onClick={onClick}>{title}</button>;
}

export default SmallButton;
