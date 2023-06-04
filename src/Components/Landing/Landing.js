import React from "react";
import styles from "./landing.module.css";
import illustration from "../../Assets/Images/Add tasks-pana 1.svg";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <>
      <div className={styles.landing} id="home">
        <div className={styles.illustration}>
          <svg
            width="620"
            height="620"
            viewBox="0 0 620 620"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M620 620C543.712 549.07 467.679 478.14 368.683 435.276C269.687 392.412 148.239 377.868 83.177 310C17.8601 242.132 8.93004 121.193 0 0H620V620Z"
              fill="#0080FB"
            />
          </svg>
        </div>
        <div className={styles.content}>
          <div className={styles.text}>
            <h2>Stay Organized!</h2>
            <p>
              Take control of your time, boost your productivity, and achieve
              your goals with Tanzimi. Our powerful time management application
              is designed to help you stay organized, focused, and in control of
              your busy life.
            </p>
            <div className={styles.callToActionbtn}>
              <Link to="/register">Try Now</Link>
            </div>
          </div>
          <div className={styles.image}>
            <img src={illustration} alt="illustration" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
