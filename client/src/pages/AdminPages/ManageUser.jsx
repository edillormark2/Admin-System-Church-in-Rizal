import React from "react";
import "./Admin.css";
import Navbar from "../../components/AdminComponents/Navbar";
import Sidebar from "../../components/AdminComponents/Sidebar";
import { useStateContext } from "../../redux/ContextProvider";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  const { activeMenu } = useStateContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear local storage
    localStorage.clear();

    // Dispatch signOut action
    dispatch(signOut());

    // Navigate to admin login page after signout
    navigate("/adminlogin");
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex relative ">
        {activeMenu
          ? <div className="w-64 fixed sidebar drop-shadow-xl bg-gray-100">
              <Sidebar />
            </div>
          : <div className="w-0 drop-shadow-xl bg-gray-100">
              <Sidebar />
            </div>}
        <div
          className={` bg-white min-h-screen w-full ${activeMenu
            ? "md:ml-60"
            : "flex-1"}`}
        >
          <div className="fixed md:static navbar w-full md:w-11/12 mx-auto rounded-md">
            <Navbar />
          </div>
          <div className="flex flex-col items-center mt-40">
            <h1 className="mb-4">ManageUser</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
