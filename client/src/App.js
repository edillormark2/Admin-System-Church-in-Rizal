import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  return (
    <div>
      <BrowserRouter>
        <ToastContainer {...customToastStyle} />
        <div className="flex flex-col min-h-screen">
          <div className="fixed bg-main-bg dark:bg-main-dark-bg navbar w-full z-50">
            <Navbar />
          </div>
          <main className="flex-grow bg-gray-100 dark:bg-main-dark-bg p-2">
            <Routes>
              {/* Login pages */}
              <Route path="/" element={<AdminLogin />} />
              <Route path="/adminlogin" element={<AdminLogin />} />

              <Route path="/adminsignup" element={<AdminSignup />} />
              <Route
                path="/registrationlogin"
                element={<RegistrationLogin />}
              />
              <Route path="/inventorylogin" element={<InventoryLogin />} />
              <Route path="/reportslogin" element={<ReportsLogin />} />

              {/* Admin pages */}
              <Route path="/admindashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
