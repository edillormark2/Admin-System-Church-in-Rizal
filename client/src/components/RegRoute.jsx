import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const RegRoute = () => {
  const { currentUser, isAuthenticated } = useSelector(state => state.user);

  // Check if user is authenticated and is an admin
  const isRegLoggedIn =
    isAuthenticated && currentUser && currentUser.role === "reg";

  return isRegLoggedIn
    ? <Outlet />
    : <Navigate to="/registrationlogin" replace={true} />;
};

export default RegRoute;
