import React, { useState } from "react";
import logoIcon from "../../Assets/Images/64.svg";
import logoText from "../../Assets/Images/text.svg";
import styles from "./navbar.module.css";
import { Link, NavLink } from "react-router-dom";
function Navbar() {
  const [toggleIcon, setToggleIcon] = useState(styles.navIcon);
  const [active, setActive] = useState(styles.links);
const handleClick = () => {
  if (active === styles.links) {
    setActive(`${styles.links} ${styles.navActive}`);
  } else {
    setActive(styles.links);
  }
  if (toggleIcon === styles.navIcon) {
    setToggleIcon(`${styles.navIcon} ${styles.toggle}`);
  } else {
    setToggleIcon(styles.navIcon);
  }
};


  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img src={logoIcon} alt="logo" />
          <div className={styles.logoText}>
            <img src={logoText} alt="text" />
          </div>
        </div>
        <div className={active}>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
          <Link to="/login" className={styles.loginButton}>
            Sign In
          </Link>
        </div>
        <div onClick={handleClick} className={toggleIcon}>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
