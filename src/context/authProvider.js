import React, { createContext, useContext,useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies,setCookie] = useCookies(["userToken", "userInfo"]);

const navigate = useNavigate();
  useEffect(() => {

     console.log('COOOKIE',cookies.userToken);
    if(cookies.userToken){
      setToken(token);
    }
    if(!cookies.userToken && !token){
      navigate('/login')
      console.log("logged out")
    }
  }, [navigate,token]);
useEffect(()=>{
  console.log("HERE",token)
},[navigate])

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
        setToken,
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



export const TokenState = () => {
  return useContext(AuthContext);
};

