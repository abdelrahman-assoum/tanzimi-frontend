import React, { useState } from "react";
import InputField from "../../Components/Input/InputField";
import LoginLogo from "../../Assets/Images/loginLogo.svg";
import Logo from "../../Assets/Images/Logo.svg";
import styles from "./register.module.css";
import Button from "../../Components/Button/Button";
import Heading from "../../Components/heading/Heading";
import { Link } from "react-router-dom";

function Register() {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    Password: "",
  });
  return (
    <>
      <div className={styles.registerPage}>
        <div className={styles.leftSide}>
          <img src={LoginLogo} alt="logo" />
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightSideRegister}>
            <img src={Logo} alt="logo" className={styles.logo} />
            <form className={styles.registerForm}>
              <div className={styles.registerInputs}>
                <Heading
                  title="Create an Account"
                  description="Enter your credentials to access our website"
                />
                <div className={styles.inputContainer}>
                  <InputField label="First Name" placeholder="" type="name" />
                  <InputField label="Last Name" placeholder="" type="name" />
                  <InputField
                    label="Email address"
                    placeholder="example@gmail.com"
                    type="email"
                  />
                  <InputField
                    label="Phone Number"
                    placeholder="01 234 567"
                    type="tel"
                  />
                  <InputField
                    label="Password"
                    placeholder="at least 8 characters"
                    type="password"
                  />
                  <InputField
                    label="Confirm Password"
                    placeholder="at least 8 characters"
                    type="password"
                  />
                </div>
                <Button type="submit" title="Sign Up" />
                <div className={styles.oldaccount}>
                  <p>
                    Already Have an account?
                    <Link to="/login">
                      <span className={styles.newAction}>Sign In</span>
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
