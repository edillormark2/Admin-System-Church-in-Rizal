import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ReportsRoute = () => {
  const { currentUser, isAuthenticated } = useSelector(state => state.user);

  // Check if user is authenticated and is an admin
  const isRegLoggedIn =
    isAuthenticated && currentUser && currentUser.role === "reports";

  return isRegLoggedIn ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default ReportsRoute;
