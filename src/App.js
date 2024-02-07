import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login/Login";
import AdminLogin from "./pages/Login/AdminLogin";
import RegistrationLogin from "./pages/Login/RegistrationLogin";
import InventoryLogin from "./pages/Login/InventoryLogin";
import ReportsLogin from "./pages/Login/ReportsLogin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login pages */}
        <Route path="/" element={<Login />} />
        <Route path="/login/adminlogin" element={<AdminLogin />} />
        <Route
          path="/login/registrationlogin"
          element={<RegistrationLogin />}
        />
        <Route path="/login/inventorylogin" element={<InventoryLogin />} />
        <Route path="/login/reportslogin" element={<ReportsLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
