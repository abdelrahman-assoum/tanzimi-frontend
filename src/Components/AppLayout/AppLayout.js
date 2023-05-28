import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  const [sideNavExpanded, setSideNavExpanded] = useState(false);
  const contentStyle = {
    marginLeft: sideNavExpanded ? "250px" : "78px", // arbitrary values
    transition: "margin 0.5s ease",
  };
  document.body.style.background = "var(--bgColor)"

  return (
    <div>
      <Sidebar
        setSideNavExpanded={setSideNavExpanded}
        sideNavExpanded={sideNavExpanded}
      />
      <div style={contentStyle}>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
