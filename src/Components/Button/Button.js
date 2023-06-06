import React from "react";
import styles from "./button.module.css";

function Button({ title, onClick }) {
  return <button className={styles.mybutton} onClick={onClick? onClick : ''}>{title}</button>;
}

export default Button;
