import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["userToken", "userInfo"]);

  // useEffect(() => {
  //   setToken(cookies.userToken);
  //   setUserInfo(cookies.userInfo);
  //   setLoading(false); // Set loading to false after state updates
  // }, [cookies]);


    const handleLogin = (token, userinfo) => {
      setToken(token);
      setUserInfo(userinfo);
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
        handleLogin,
        handleLogout,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
