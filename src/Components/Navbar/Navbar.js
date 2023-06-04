import React from 'react'
import logoIcon from "../../Assets/Images/64.svg";
import logoText from "../../Assets/Images/text.svg";
import styles from './navbar.module.css'
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img src={logoIcon} alt="logo" />
          <div className={styles.logoText}>
            <img src={logoText} alt="text" />
          </div>
        </div>
        <div className={styles.links}>
          <Link to="#home">Home</Link>  
          <Link to="#feature">Features</Link>
          <Link to="#contact">Contact</Link>
          <Link to="/login" className={styles.loginButton}>Sign In</Link>
        </div>
      </div>
    </>
  );
}

export default Navbar