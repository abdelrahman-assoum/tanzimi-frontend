import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["userToken", "userInfo"]);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("COOOKIE", cookies.userToken);
    if (cookies.userToken) {
      setToken(cookies.userToken);
      // console.log('anaHon')
    }
    if (cookies.userInfo) {
      setUserInfo(cookies.userInfo);
    }
  }, [token, userInfo]);


  const handleLoginSuccess = (token, userInfo) => {
    setToken(token);
    setUserInfo(userInfo);
  };

  const handleLogout = () => {
    setToken(null);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userInfo,
        loading,
        handleLoginSuccess,
        handleLogout,
        setToken,
        setUserInfo,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const TokenState = () => {
  return useContext(AuthContext);
};
