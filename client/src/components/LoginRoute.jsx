import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginRoute = ({ element }) => {
  const { currentUser } = useSelector(state => state.user);

  // Check the user's login type and redirect accordingly
  const determineDashboard = () => {
    if (currentUser) {
      switch (currentUser.loginType) {
        case "admin":
          return "/admin";
        case "registration":
          return "/registration";
        // Add more cases for other login types if needed
        default:
          return "/";
      }
    }
    return "/";
  };

  return currentUser ? <Navigate to={determineDashboard()} /> : element;
};

export default LoginRoute;
