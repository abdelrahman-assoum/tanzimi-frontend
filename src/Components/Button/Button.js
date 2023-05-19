import React from 'react';
import styles from "./button.module.css";

function Button(props) {
  return (
    <button className={styles.mybutton}>{props.title}</button>
    )
}

export default Button