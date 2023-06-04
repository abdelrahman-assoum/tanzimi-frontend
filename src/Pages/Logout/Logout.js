import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authProvider";
import { useCookies } from "react-cookie";

function Logout() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userToken","userToken"]);
  const { handleLogout } = useContext(AuthContext);

  useEffect(() => {
    const handleLogoutAndRemoveCookie = () => {
      removeCookie("userToken");
      removeCookie("userInfo");
      navigate("/login");
    };

    handleLogout();
    handleLogoutAndRemoveCookie();
  }, [handleLogout, navigate, removeCookie]);

  return null;
}

export default Logout;
