import React from 'react';
import styles from "./button.module.css";

function Button(props) {
  return (
    <div className={styles.buttonComponent}>
    <button type={props.type} className={styles.button}>{props.title}</button>
    </div>
    )
}

export default Button