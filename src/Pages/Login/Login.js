import React, { useState } from "react";
import InputField from "../../Components/Input/InputField";
import LoginLogo from "../../Assets/Images/loginLogo.svg";
import Logo from "../../Assets/Images/Logo.svg";
import styles from "./login.module.css";
import Button from "../../Components/Button/Button";
import Heading from "../../Components/heading/Heading";
import { Link } from "react-router-dom";

function Login() {

  const [loginData, setLoginData] = useState({email: "", password: "",})
  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.leftSideLogin}>
          <img src={LoginLogo} alt="logo" />
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightSideLogin}>
            <img src={Logo} alt="logo" className={styles.logo} />
           <form className={styles.loginForm}>
              <div className={styles.loginInputs}>
                <Heading
                  title="Log In"
                  description="Enter your credentials to access your account"
                />
                <InputField
                  label="Email address"
                  placeholder="example@gmail.com"
                  type="email"
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
                <InputField
                  label="Password"
                  placeholder="password"
                  type="password"
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <Button type="submit" title="Sign In" />
                <div className={styles.newaccount}>
                  <p>
                    Don't Have an account?
                    <Link to="/register">
                      <span className={styles.newAction}>Sign Up</span>
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

export default Login;
