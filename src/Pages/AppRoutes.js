import { BrowserRouter, Route, Routes} from "react-router-dom"
import React, { useEffect, useState } from 'react'
import App from "../App"
import Login from "./Login/Login"
import Home from "./Home/Home"
import Register from "./Register/Register"
import { UserContext } from "../UserContext"
import Cookies from "js-cookie"
function AppRoutes() {
    const [token, setToken] =useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    
  useEffect(() => {
    const authToken = Cookies.get("token");
    if (authToken) {
      setToken(authToken);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{token, isLoggedIn, setToken, setIsLoggedIn}}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {/* <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes> */}
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default AppRoutes