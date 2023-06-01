import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const { token, userId } = useContext(UserContext);
 console.log( token, userId );
  useEffect(() => {
    if (!token || !userId) {
      navigate('/login');
    }
  }, [token, userId, navigate]);

  return <Outlet />;
};

export default PrivateRoutes;
