import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login/Login";
import AdminLogin from "./pages/Login/AdminLogin";
import RegistrationLogin from "./pages/Login/RegistrationLogin";
import InventoryLogin from "./pages/Login/InventoryLogin";
import ReportsLogin from "./pages/Login/ReportsLogin";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <div className="fixed bg-main-bg dark:bg-main-dark-bg navbar w-full z-50">
            <Navbar />
          </div>
          <main className="flex-grow bg-gray-100 dark:bg-main-dark-bg p-2">
            <Routes>
              {/* Login pages */}
              <Route path="/" element={<Login />} />
              <Route path="/adminlogin" element={<AdminLogin />} />
              <Route
                path="/registrationlogin"
                element={<RegistrationLogin />}
              />
              <Route path="/inventorylogin" element={<InventoryLogin />} />
              <Route path="/reportslogin" element={<ReportsLogin />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
