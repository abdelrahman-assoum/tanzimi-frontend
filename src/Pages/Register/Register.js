import React, { useContext, useState } from "react";
import InputField from "../../Components/Input/InputField";
import LoginLogo from "../../Assets/Images/loginLogo.svg";
import Logo from "../../Assets/Images/Logo.svg";
import styles from "./register.module.css";
import Button from "../../Components/Button/Button";
import Heading from "../../Components/heading/Heading";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../UserContext";
import Cookies from "js-cookie";

function Register() {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setToken, setIsLoggedIn, setUserInfo } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!newUser.firstName.trim()) {
      errors.firstName = "First name is required";
      toast.error("First name is required");
    }

    if (!newUser.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!newUser.email.trim()) {
      errors.email = "Email address is required";
      toast.error("Email address is required");
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      errors.email = "Email address is invalid";
      toast.error("Email address is invalid");
    }

    if (!newUser.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
      toast.error("Phone Number is required");
    } else if (newUser.phoneNumber.length < 8) {
      errors.phoneNumber = "Phone Number should be at least 8 characters long";
      toast.error("Phone Number should be at least 8 characters long");
    }

    if (!newUser.password.trim()) {
      errors.password = "Password is required";
      toast.error("Password is required");
    } else if (newUser.password.length < 8) {
      errors.password = "Password should be at least 8 characters long";
      toast.error("Password should be at least 8 characters long");
    }

    if (newUser.password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      toast.error("Passwords do not match");
    }

    setErrors(errors);
    console.log(errors);

    if (Object.keys(errors).length === 0) {
      // Perform registration logic
      axios
        .post(`${process.env.REACT_APP_URL}/users/register`, newUser)
        .then((response) => {
          console.log(response);
          setUserInfo(response.data.user);
          setToken(response.data.token);
          const authToken = response.data.token;
          Cookies.set("userToken", authToken, { expires: 1 });
          return navigate("/");
        })
        .then(() => {
          toast.success("Registration successful!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className={styles.registerPage}>
        <div className={styles.leftSide}>
          <img src={LoginLogo} alt="logo" />
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightSideRegister}>
            <img src={Logo} alt="logo" className={styles.logo} />
            <form className={styles.registerForm} onSubmit={handleSubmit}>
              <div className={styles.registerInputs}>
                <Heading
                  title="Create an Account"
                  description="Enter your credentials to access our website"
                />
                <div className={styles.inputContainer}>
                  <InputField
                    label="First Name"
                    placeholder=""
                    type="text"
                    onChange={(e) => {
                      setNewUser({ ...newUser, firstName: e.target.value });
                    }}
                  />
                  <InputField
                    label="Last Name"
                    placeholder=""
                    type="text"
                    onChange={(e) => {
                      setNewUser({ ...newUser, lastName: e.target.value });
                    }}
                  />
                  <InputField
                    label="Email address"
                    placeholder="example@gmail.com"
                    type="email"
                    onChange={(e) => {
                      setNewUser({ ...newUser, email: e.target.value });
                    }}
                  />
                  <InputField
                    label="Phone Number"
                    placeholder="01 234 567"
                    type="tel"
                    onChange={(e) => {
                      setNewUser({ ...newUser, phoneNumber: e.target.value });
                    }}
                  />
                  <InputField
                    label="Password"
                    placeholder="at least 8 characters"
                    type="password"
                    onChange={(e) => {
                      setNewUser({ ...newUser, password: e.target.value });
                    }}
                  />
                  <InputField
                    label="Confirm Password"
                    placeholder="at least 8 characters"
                    type="password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>
                <Button title="Sign Up" />
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
