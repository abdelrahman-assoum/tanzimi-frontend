import { BrowserRouter, Route, Routes} from "react-router-dom"
import React, { useEffect, useState } from 'react'
import Login from "./Login/Login"
// import Home from "./Home/Home"
import Register from "./Register/Register"
import { UserContext } from "../UserContext"
import Cookies from "js-cookie"
import Dashboard from "./Dashboard/Dashboard"
import Tasks from "./Tasks/Tasks"
import Schedule from "./Schedule/Schedule"
import PomodoroPage from "./Pomodoro/PomodoroPage"
import Goals from "./Goals/Goals"
import Journals from "./Journals/Journals"
import AppLayout from "../Components/AppLayout/AppLayout"
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
      <UserContext.Provider
        value={{ token, isLoggedIn, setToken, setIsLoggedIn }}
      >
          <Routes>
            <Route path="/login" element={<Login />}  />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/pomodoro" element={<PomodoroPage />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/journals" element={<Journals />} />
            </Route>
          </Routes>
          {/* <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes> */}
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default AppRoutes