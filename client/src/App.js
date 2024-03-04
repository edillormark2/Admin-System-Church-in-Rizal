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
import RegProfileSettings from "./pages/RegistrationPages/RegProfileSettings";
import Announcement from "./pages/RegistrationPages/Announcement";
import ManageRegForm from "./pages/RegistrationPages/ManageRegForm";
import EditRegDetails from "./pages/RegistrationPages/EditRegDetails";
import BRregistrants from "./pages/RegistrationPages/Registrants/BibleReading/BRregistrants";
import AddBRregistrants from "./pages/RegistrationPages/Registrants/BibleReading/AddBRregistrants";
import ViewBRregistrants from "./pages/RegistrationPages/Registrants/BibleReading/ViewBRregistrant";
import CheckInOut from "./pages/RegistrationPages/CheckInOut";
import TOLTregistrants from "./pages/RegistrationPages/Registrants/TOLT/TOLTregistrants";
import AddTOLTregistrants from "./pages/RegistrationPages/Registrants/TOLT/AddTOLTregistrants";
import ViewTOLTregistrants from "./pages/RegistrationPages/Registrants/TOLT/ViewTOLTregistrants";

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
                  path="user-profile-settings/:userID"
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
                <Route path="dashboard" element={<RegDashboard />} />
                <Route
                  path="user-reg-profile-settings/:userID"
                  element={<RegProfileSettings />}
                />
                <Route path="announcement" element={<Announcement />} />
                <Route path="manage-registration" element={<ManageRegForm />} />
                <Route
                  path="manage-registration/edit-details/:id"
                  element={<EditRegDetails />}
                />
                <Route path="check-in-out" element={<CheckInOut />} />
                {/* Registrants routes */}
                <Route
                  path="manage-registration/BR-registrants"
                  element={<BRregistrants />}
                />
                <Route
                  path="manage-registration/BR-registrants/Add-BRregistrants"
                  element={<AddBRregistrants />}
                />
                <Route
                  path="manage-registration/BR-registrants/view-registrant/:id"
                  element={<ViewBRregistrants />}
                />
                <Route
                  path="manage-registration/TOLT-registrants"
                  element={<TOLTregistrants />}
                />
                <Route
                  path="manage-registration/TOLT-registrants/Add-TOLTregistrants"
                  element={<AddTOLTregistrants />}
                />
                <Route
                  path="manage-registration/TOLT-registrants/view-registrant/:id"
                  element={<ViewTOLTregistrants />}
                />
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
