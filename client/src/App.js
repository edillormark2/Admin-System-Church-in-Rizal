import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./pages/Login/AdminSignup";
import AdminLogin from "./pages/Login/AdminLogin";
import RegistrationLogin from "./pages/Login/RegistrationLogin";
import InventoryLogin from "./pages/Login/InventoryLogin";
import ReportsLogin from "./pages/Login/ReportsLogin";
import Navbar from "./components/Navbar";
import AdminSignup from "./pages/Login/AdminSignup";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import LoginRoute from "./components/LoginRoute";
import { useSelector } from "react-redux";
import UserLogs from "./pages/AdminPages/UserLogs";

const customToastStyle = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored"
};

const App = () => {
  const { currentUser } = useSelector(state => state.user);
  const isUserSignedIn = !!currentUser;

  return (
    <div>
      <BrowserRouter>
        <ToastContainer {...customToastStyle} />
        <div className="flex flex-col min-h-screen">
          {!isUserSignedIn &&
            <div className="fixed bg-main-bg dark:bg-main-dark-bg navbar w-full z-50">
              <Navbar />
            </div>}
          <main className="flex-grow bg-gray-100 dark:bg-main-dark-bg p-2">
            <Routes>
              {/* Admin routes */}
              <Route path="/" element={<AdminRoute />}>
                <Route index element={<AdminDashboard />} />
                <Route path="/userlogs" element={<UserLogs />} />
              </Route>

              {/* Login routes */}
              <Route
                path="/adminlogin"
                element={<LoginRoute element={<AdminLogin />} />}
              />
              <Route
                path="/registrationlogin"
                element={<LoginRoute element={<RegistrationLogin />} />}
              />
              <Route
                path="/inventorylogin"
                element={<LoginRoute element={<InventoryLogin />} />}
              />
              <Route
                path="/reportslogin"
                element={<LoginRoute element={<ReportsLogin />} />}
              />
              <Route path="/adminsignup" element={<AdminSignup />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
