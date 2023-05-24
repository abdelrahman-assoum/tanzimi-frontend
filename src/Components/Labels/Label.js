import React from "react";
import styles from "./labels.module.css";

function hexToRGBA(hex, alpha) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function Label(props) {
  const backgroundOpacity = 0.2;

  const labelStyle = {
    color: props.color,
    background: hexToRGBA(props.color, backgroundOpacity),
  };

  return (
    <div className={styles.labelComponent} style={labelStyle}>
      {props.labelName}
    </div>
  );
}

export default Label;
