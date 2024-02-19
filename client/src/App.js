import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Flip } from "react-toastify";
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
import ManageUser from "./pages/AdminPages/ManageUser/ManageUser";
import ProfileSettings from "./pages/AdminPages/ProfileSettings";
import BibleReadingReg from "./pages/AdminPages/Registration/BibleReadingReg";
import ManageAdmin from "./pages/AdminPages/ManageUser/ManageAdmin";
import EditAdmin from "./pages/AdminPages/ManageUser/EditAdmin";
import ManageReg from "./pages/AdminPages/ManageUser/ManageReg";
import EditReg from "./pages/AdminPages/ManageUser/EditReg";
import ManageInv from "./pages/AdminPages/ManageUser/ManageInv";
import EditInv from "./pages/AdminPages/ManageUser/EditInv";
import ManageReport from "./pages/AdminPages/ManageUser/ManageReport";
import EditReport from "./pages/AdminPages/ManageUser/EditReport";

const customToastStyle = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Flip
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
                <Route
                  path="user-profile-settings"
                  element={<ProfileSettings />}
                />
                {/*Reg pages */}
                <Route path="reg/bible-reading" element={<BibleReadingReg />} />
                {/*Manage User pages */}
                <Route
                  path="manage-user/admin-user"
                  element={<ManageAdmin />}
                />
                <Route
                  path="manage-user/registration-user"
                  element={<ManageReg />}
                />
                <Route
                  path="manage-user/inventory-user"
                  element={<ManageInv />}
                />
                <Route
                  path="manage-user/report-user"
                  element={<ManageReport />}
                />
                <Route
                  path="manage-user/admin-user/:userID"
                  element={<EditAdmin />}
                />
                <Route
                  path="manage-user/registration-user/:userID"
                  element={<EditReg />}
                />
                <Route
                  path="manage-user/inventory-user/:userID"
                  element={<EditInv />}
                />
                <Route
                  path="manage-user/report-user/:userID"
                  element={<EditReport />}
                />
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
