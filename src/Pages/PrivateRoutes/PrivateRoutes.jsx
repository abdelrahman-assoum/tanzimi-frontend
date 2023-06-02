import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authProvider";
import { toast } from "react-hot-toast";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const { token, userInfo } = useContext(AuthContext);
  // const { loading } = useContext(AuthContext); // Add loading from context
  console.log(token, userInfo)
  useEffect(() => {
    // if (!loading) {
      if (!token || !userInfo) {
        toast.error('You must be logged in')
        navigate("/login");
      }
    // }
  }, [token, userInfo, navigate]);

  return <Outlet />;
};

export default PrivateRoutes;

