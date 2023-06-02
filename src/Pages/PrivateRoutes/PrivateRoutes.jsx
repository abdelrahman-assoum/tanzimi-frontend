import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TokenState } from "../../context/authProvider";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";

const PrivateRoutes = () => {
  const [cookies,setCookie] = useCookies(["userToken", "userInfo"]);
  const navigate = useNavigate();
  const { token, userInfo } = TokenState();


  // const { loading } = useContext(AuthContext); // Add loading from context
  // console.log(token, userInfo)
  useEffect(()=> {
    if(!cookies.userToken && !cookies.userInfo && !token && !userInfo){
      navigate('/login')
      console.log("logged out")
    }
  },[navigate])
  // useEffect(() => {
  //   // if (!loading) {
  //     if (!token || !userInfo) {
  //       toast.error('You must be logged in')
  //       navigate("/login");
  //     }
  //   // }
  // }, [token, userInfo, navigate]);

  return <Outlet />;
};

export default PrivateRoutes;

