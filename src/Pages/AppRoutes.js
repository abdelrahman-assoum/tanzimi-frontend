import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Login from "./Login/Login";
// import Home from "./Home/Home"
import Register from "./Register/Register";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";
import Dashboard from "./Dashboard/Dashboard";
import Tasks from "./Tasks/Tasks";
import Schedule from "./Schedule/Schedule";
import PomodoroPage from "./Pomodoro/PomodoroPage";
import Goals from "./Goals/Goals";
import Journals from "./Journals/Journals";
import AppLayout from "../Components/AppLayout/AppLayout";
import Logout from "./Logout/Logout";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
function AppRoutes() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  

  const handleAuth = () => {
    const authToken = Cookies.get("userToken");
    const userId = Cookies.get("passport");
    if (authToken) {
      setToken(authToken);
    }
    if (userId) {
      setUserId(userId);
    }
  };

  useLayoutEffect(() => {
    handleAuth();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          token,
          userId,
          setToken,
          setUserId,
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/logout" element={<Logout />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="pomodoro" element={<PomodoroPage />} />
              <Route path="goals" element={<Goals />} />
              <Route path="journals" element={<Journals />} />
            </Route>
          </Route>
        </Routes>
        {/* <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes> */}
        <Toaster />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default AppRoutes;
