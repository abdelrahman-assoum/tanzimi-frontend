import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const removeCookie = () => {
      Cookies.remove("userToken");
      Cookies.remove("passport");
      navigate("/login");
    };

    removeCookie();
  }, [navigate]);

  return null;
}

export default Logout;
