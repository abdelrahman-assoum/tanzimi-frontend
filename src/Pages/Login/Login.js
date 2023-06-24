import React, { useContext, useState } from "react";
import InputField from "../../Components/Input/InputField";
import LoginLogo from "../../Assets/Images/loginLogo.svg";
import Logo from "../../Assets/Images/Logo.svg";
import styles from "./login.module.css";
import Button from "../../Components/Button/Button";
import Heading from "../../Components/heading/Heading";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/authProvider";
// import { TokenState } from "../../context/authProvider";


function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userInfo", "userToken"]);

  const { handleLoginSuccess } = useContext(AuthContext);

  // const { token, setToken } = TokenState();
  // console.log('token', token);
  // console.log("userId", userId);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);
  // Function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to check password length
  function isValidPassword(password) {
    return password.length >= 8;
  }

  const handleLoginFunction = (event) => {
    event.preventDefault();
    if (!isValidEmail(loginData.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!isValidPassword(loginData.password)) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_URL}/users/login`, loginData)
      .then((response) => {
        console.log(response)
        const authToken = response.data.token;
        const user = response.data.user;
        console.log(user)
        handleLoginSuccess(authToken, user);
      //  setToken(authToken);
        setCookie("userToken", authToken, {
          path: "/",
          expires: expirationDate,
        }); //
        setCookie("userInfo", user, { path: "/", expires: expirationDate }); //
        
        navigate("/app");
      })
      .then(() => {
        toast.success("Login successful!");
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error(error.message || "An error occurred, please try again");
        }
      });
  };

  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.leftSideLogin}>
          <img src={LoginLogo} alt="logo" />
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightSideLogin}>
            <img src={Logo} alt="logo" className={styles.logo} />
            <form className={styles.loginForm} onSubmit={handleLoginFunction}>
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
                <Button title="Sign In" />
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
 