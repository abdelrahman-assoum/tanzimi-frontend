import React, { useState } from 'react'
import styles from './inputfield.module.css'
function InputField(props) {
    const [clicked, setClicked] = useState(styles.fieldInput);
  return (
    <>
      <div className={styles.inputComponent}>
        <label className={styles.fieldLabel}>{props.label} </label>
        <input
          type={props.type}
          placeholder={props.placeholder}
          className={clicked}
          onFocus={() =>
              setClicked(`${styles.fieldInput} ${styles.clickedInput}`)
          }
          onBlur={()=> {
            setClicked(styles.fieldInput);
            }
          }
          onInput={()=> {
            setClicked(`${styles.fieldInput} ${styles.clickedInput}`);
          }}
          onChange={props.onChange}
        />
      </div>
    </>
  );
}

export default InputField