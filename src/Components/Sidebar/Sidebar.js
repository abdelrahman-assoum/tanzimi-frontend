import React, { useState } from "react";
import "./sidebar.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../../Assets/Images/SmallLogo.svg";

const Sidebar = ({ sideNavExpanded, setSideNavExpanded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
     setSideNavExpanded(!sideNavExpanded);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo-details">
        <img src={logo} alt="logo" className="smallLogo icon" />
        <div className="logo_name">Tanzimi</div>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 96 960 960"
            id="btn"
            onClick={handleToggle}
          >
            <path d="M120 816v-60h520v60H120Zm678-52L609 575l188-188 43 43-145 145 146 146-43 43ZM120 604v-60h400v60H120Zm0-208v-60h520v60H120Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 96 960 960"
            id="btn"
            onClick={handleToggle}
            onToggle={() => {
              setSideNavExpanded(!sideNavExpanded);
            }}
          >
            <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
          </svg>
        )}
      </div>
      <ul className="nav-list">
        <li>
          <NavLink to="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="M120 546V216h330v330H120Zm0 390V606h330v330H120Zm390-390V216h330v330H510Zm0 390V606h330v330H510ZM180 486h210V276H180v210Zm390 0h210V276H570v210Zm0 390h210V666H570v210Zm-390 0h210V666H180v210Zm390-390Zm0 180Zm-180 0Zm0-180Z" />
            </svg>
            <span className="links_name">Dashboard</span>
          </NavLink>
          <span className="tooltip">Dashboard</span>
        </li>
        <li>
          <NavLink to="/tasks">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="M377 858v-60h463v60H377Zm0-252v-60h463v60H377Zm0-253v-60h463v60H377ZM189 895q-28.05 0-48.025-19Q121 857 121 828.5t19.5-48q19.5-19.5 48-19.5t47.5 19.975Q255 800.95 255 829q0 27.225-19.387 46.612Q216.225 895 189 895Zm0-252q-28.05 0-48.025-19.681Q121 603.638 121 576t19.975-47.319Q160.95 509 189 509q27.225 0 46.613 19.681Q255 548.362 255 576t-19.387 47.319Q216.225 643 189 643Zm-1-253q-27.637 0-47.319-19.681Q121 350.638 121 323t19.681-47.319Q160.363 256 188 256q27.637 0 47.319 19.681Q255 295.362 255 323t-19.681 47.319Q215.637 390 188 390Z" />
            </svg>
            <span className="links_name">Task List</span>
          </NavLink>
          <span className="tooltip">Task List</span>
        </li>
        <li>
          <NavLink to="/schedule">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="M180 976q-24 0-42-18t-18-42V296q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600V486H180v430Zm0-490h600V296H180v130Zm0 0V296v130Zm300 230q-17 0-28.5-11.5T440 616q0-17 11.5-28.5T480 576q17 0 28.5 11.5T520 616q0 17-11.5 28.5T480 656Zm-160 0q-17 0-28.5-11.5T280 616q0-17 11.5-28.5T320 576q17 0 28.5 11.5T360 616q0 17-11.5 28.5T320 656Zm320 0q-17 0-28.5-11.5T600 616q0-17 11.5-28.5T640 576q17 0 28.5 11.5T680 616q0 17-11.5 28.5T640 656ZM480 816q-17 0-28.5-11.5T440 776q0-17 11.5-28.5T480 736q17 0 28.5 11.5T520 776q0 17-11.5 28.5T480 816Zm-160 0q-17 0-28.5-11.5T280 776q0-17 11.5-28.5T320 736q17 0 28.5 11.5T360 776q0 17-11.5 28.5T320 816Zm320 0q-17 0-28.5-11.5T600 776q0-17 11.5-28.5T640 736q17 0 28.5 11.5T680 776q0 17-11.5 28.5T640 816Z" />
            </svg>
            <span className="links_name">Schedule</span>
          </NavLink>
          <span className="tooltip">Schedule</span>
        </li>
        <li>
          <NavLink to="/goals">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="M480 976q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176h30v326q22 9 36 29t14 45q0 33-23.5 56.5T480 656q-33 0-56.5-23.5T400 576q0-25 14-45t36-29V398q-65 11-107.5 60.5T300 576q0 75 52.5 127.5T480 756q75 0 127.5-52.5T660 576q0-41-16-75t-44-59l43-43q35 33 56 78.5t21 98.5q0 100-70 170t-170 70q-100 0-170-70t-70-170q0-93 60-160.5T450 337V237q-131 11-220.5 108T140 576q0 142 99 241t241 99q142 0 241-99t99-241q0-74-28.5-137T713 329l43-43q57 55 90.5 129.5T880 576q0 83-31.5 156T763 859q-54 54-127 85.5T480 976Z" />
            </svg>
            <span className="links_name">Goals</span>
          </NavLink>
          <span className="tooltip">Goals</span>
        </li>
        <li>
          <NavLink to="/pomodoro">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="M360 196v-60h240v60H360Zm90 447h60V413h-60v230Zm30 332q-74 0-139.5-28.5T226 869q-49-49-77.5-114.5T120 615q0-74 28.5-139.5T226 361q49-49 114.5-77.5T480 255q67 0 126 22.5T711 340l51-51 42 42-51 51q36 40 61.5 97T840 615q0 74-28.5 139.5T734 869q-49 49-114.5 77.5T480 975Zm0-60q125 0 212.5-87.5T780 615q0-125-87.5-212.5T480 315q-125 0-212.5 87.5T180 615q0 125 87.5 212.5T480 915Zm0-299Z" />
            </svg>
            <span className="links_name">Pomodoro</span>
          </NavLink>
          <span className="tooltip">Pomodoro</span>
        </li>
        <li>
          <NavLink to="/journals">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="M319 806h322v-60H319v60Zm0-170h322v-60H319v60Zm-99 340q-24 0-42-18t-18-42V236q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554V236H220v680h520V422H551ZM220 236v186-186 680-680Z" />
            </svg>
            <span className="links_name">Journals</span>
          </NavLink>
          <span className="tooltip">Journals</span>
        </li>

        <li className="profile">
          <div className="profile-details">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 96 960 960"
              id="profile-image"
            >
              <path d="M222 801q63-44 125-67.5T480 710q71 0 133.5 23.5T739 801q44-54 62.5-109T820 576q0-145-97.5-242.5T480 236q-145 0-242.5 97.5T140 576q0 61 19 116t63 109Zm257.814-195Q422 606 382.5 566.314q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314 566.5q-39.686 39.5-97.5 39.5Zm.654 370Q398 976 325 944.5q-73-31.5-127.5-86t-86-127.266Q80 658.468 80 575.734T111.5 420.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5 207.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5 731q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480 916q55 0 107.5-16T691 844q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480 916Zm0-370q34 0 55.5-21.5T557 469q0-34-21.5-55.5T480 392q-34 0-55.5 21.5T403 469q0 34 21.5 55.5T480 546Zm0-77Zm0 374Z" />
            </svg>
            <div className="name_job">
              <div className="name">UserName</div>
            </div>
            {/* </div> */}
            <Link to="/logout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 96 960 960"
              id="log_out"
            >
              <path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z" />
            </svg>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
