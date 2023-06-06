import React from "react";
import "./home.css";
import Navbar from "../../Components/Navbar/Navbar";
import Landing from "../../Components/Landing/Landing";
import Features from "../../Components/Features/Features";
import Contact from "../../Components/Contact/Contact";
function Home() {
  return (
    <>
      <div className="home">
        <Navbar />
        <Landing />
        <Features />
        <Contact />
      </div>
    </>
  );
}

export default Home;
