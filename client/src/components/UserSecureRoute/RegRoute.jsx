import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const RegRoute = () => {
  const { currentUser, isAuthenticated } = useSelector(state => state.user);

  // Check if user is authenticated and is an admin
  const isRegLoggedIn =
    isAuthenticated && currentUser && currentUser.role === "registration";

  return isRegLoggedIn ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default RegRoute;
