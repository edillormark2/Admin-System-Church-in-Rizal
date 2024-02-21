import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const { currentUser } = useSelector(state => state.user);
  const isAdminLoggedIn = currentUser && currentUser.role === "Admin";

  return isAdminLoggedIn ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default AdminRoute;
