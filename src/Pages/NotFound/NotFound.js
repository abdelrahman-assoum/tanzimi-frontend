import React from 'react'
import styles from './notfound.module.css'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <div className={styles.notFoundPage}>
        <div className={styles.notFound}>
          <div className={styles.errorImg}>
            <svg
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M108.103 328L72 291.897L163.897 200L72 108.103L108.103 72L200 163.897L291.897 72L328 108.103L236.103 200L328 291.897L291.897 328L200 236.103L108.103 328Z"
                fill="#333333"
              />
              <path
                d="M76.0256 123.974L0 200L76.0256 276.026L106.026 246.026L60 200L106.026 153.974L76.0256 123.974ZM123.974 76.0256L153.974 106.026L200 60L246.026 106.026L276.026 76.0256L200 0L123.974 76.0256ZM323.974 123.974L293.974 153.974L340 200L293.974 246.026L323.974 276.026L400 200L323.974 123.974ZM276.026 323.974L246.026 293.974L200 340L153.974 293.974L123.974 323.974L200 400L276.026 323.974Z"
                fill="#333333"
                fillOpacity="0.4"
              />
            </svg>
          </div>
          <div className={styles.text}>
            <div className={styles.head}>
              <h4>404</h4>
              <span>Page Not Found!</span>
            </div>
            <div className={styles.msg}>
              <span>
                Oops! The page you are looking for does not exist. It might have
                been moved or delete.
              </span>
            </div>
          </div>
          <div className={styles.navigateButton}>
            <Link to="/">Back to home</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound