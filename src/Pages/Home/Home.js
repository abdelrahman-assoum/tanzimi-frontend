import React from "react";
import "./home.css";
import Navbar from "../../Components/Navbar/Navbar";
import Landing from "../../Components/Landing/Landing";
function Home() {
  return (
    <>
      <div className="home">
        <Navbar />
        <Landing />
      </div>
    </>
  );
}

export default Home;
