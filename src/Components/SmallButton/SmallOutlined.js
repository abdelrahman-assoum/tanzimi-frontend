import React from "react";
import styles from "./small.module.css";

function SmallOutlined({ title, onClick }) {
  return (
    <button className={styles.smallButtonOutlined} onClick={onClick}>
      {title}
    </button>
  );
}

export default SmallOutlined;
