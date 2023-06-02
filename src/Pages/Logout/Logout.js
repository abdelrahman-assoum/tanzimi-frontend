import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authProvider";

function Logout() {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  useEffect(() => {
    const removeCookie = () => {
      Cookies.remove("userToken");
      Cookies.remove("userInfo");
      navigate("/login");
    };

    handleLogout();
    removeCookie();
  }, [handleLogout, navigate]);

  return null;
}

export default Logout;
