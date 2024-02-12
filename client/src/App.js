import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import UserLogs from "./pages/AdminPages/UserLogs";
import RegDashboard from "./pages/RegistrationPages/RegDashboard";
import AdminLogin from "./pages/Login/AdminLogin";
import RegistrationLogin from "./pages/Login/RegistrationLogin";
import InventoryLogin from "./pages/Login/InventoryLogin";
import ReportsLogin from "./pages/Login/ReportsLogin";
import Navbar from "./components/Navbar/Navbar";
import AdminSignup from "./pages/Login/AdminSignup";
import AdminRoute from "./components/UserSecureRoute/AdminRoute";
import LoginRoute from "./components/UserSecureRoute/LoginRoute";
import InvRoute from "./components/UserSecureRoute/InvRoute";
import RegRoute from "./components/UserSecureRoute/RegRoute";
import { useSelector } from "react-redux";
import NotAvailable from "./components/NotAvailable";
import InvDashboard from "./pages/InventoryPages/InvDashboard";
import ReportsDashboard from "./pages/ReportsPages/ReportsDashboard";
import ReportsRoute from "./components/UserSecureRoute/ReportsRoute";
import ManageUser from "./pages/AdminPages/ManageUser";
import BibleReadingReg from "./pages/AdminPages/Registration/BibleReadingReg";

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
            <div className="fixed bg-gray-50 dark:bg-main-dark-bg navbar w-full z-50">
              <Navbar />
            </div>}
          <main className="flex-grow bg-gray-50 dark:bg-main-dark-bg ">
            <Routes>
              {/*Default route */}
              <Route
                path="/"
                element={<LoginRoute element={<AdminLogin />} />}
              />

              {/* Admin routes */}
              <Route path="/admin/*" element={<AdminRoute />}>
                <Route path="userlogs" element={<UserLogs />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="manage-user" element={<ManageUser />} />
                {/*Reg pages */}
                <Route path="reg/bible-reading" element={<BibleReadingReg />} />
              </Route>

              {/* Registration routes */}
              <Route path="/registration/*" element={<RegRoute />}>
                <Route index element={<RegDashboard />} />
              </Route>

              {/* Inventory routes */}
              <Route path="/inventory/*" element={<InvRoute />}>
                <Route index element={<InvDashboard />} />
              </Route>

              {/* Reports routes */}
              <Route path="/reports/*" element={<ReportsRoute />}>
                <Route index element={<ReportsDashboard />} />
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
