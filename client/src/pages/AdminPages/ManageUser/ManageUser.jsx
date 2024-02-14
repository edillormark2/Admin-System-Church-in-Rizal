import React from "react";
import "../Admin.css";
import Navbar from "../../../components/AdminComponents/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar";
import { useStateContext } from "../../../redux/ContextProvider";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { ImStatsBars } from "react-icons/im";
import Breadcrumbs from "../../../components/Breadcrumbs";

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

  const breadcrumbLinks = [
    { to: "/admin/dashboard", label: "Home" },
    { to: "/manage user", label: "Manage User" }
  ];

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
          <div className="my-20 md:my-16 mx-10 md:mx-16 ">
            <div className="mb-12">
              <h1 className="text-2xl font-semibold mb-2 ">Manage User</h1>
              <Breadcrumbs links={breadcrumbLinks} />
            </div>
            <div className="flex flex-col md:flex-row gap-2 mx-0 md:mx-2 lg:mx-4 xl:mx-16">
              {/*Admin card */}
              <div className="flex flex-col bg-white drop-shadow-xl rounded-md p-4 m-2 w-full border border-gray-300  hover:border-blue-300 hover:bg-blue-50">
                <div className="flex items-center ">
                  <div className="flex items-center justify-start">
                    <MdAdminPanelSettings
                      size={60}
                      className="bg-primary p-3 rounded-xl text-white"
                    />
                  </div>
                  <div className="mx-6 flex-grow">
                    <div>
                      <p className="text-lg font-semibold">Admin</p>
                      <p className="text-sm text-slate-500">Active User</p>
                    </div>
                  </div>
                  <p className="text-4xl flex-shrink-0 ml-auto font-semibold">
                    2
                  </p>
                </div>
                <Link to="/admin/manage-user/admin">
                  <div className="bg-white border border-primary p-1 rounded-md text-black hover:bg-primary hover:text-white mt-8 text-center">
                    View User
                  </div>
                </Link>
              </div>

              {/* Registration card */}
              <div className="flex flex-col bg-white drop-shadow-xl rounded-md p-4 m-2 w-full  border border-gray-300 hover:border-blue-300  hover:bg-blue-50">
                <div className="flex items-center ">
                  <div className="flex items-center justify-start">
                    <FaClipboardList
                      size={60}
                      className="bg-primary p-3 rounded-xl text-white"
                    />
                  </div>
                  <div className="mx-6 flex-grow">
                    <div>
                      <p className="text-lg font-semibold">Registration</p>
                      <p className="text-sm text-slate-500">Active User</p>
                    </div>
                  </div>
                  <p className="text-4xl flex-shrink-0 ml-auto font-semibold">
                    7
                  </p>
                </div>
                <button className="bg-white border border-primary p-1 rounded-md text-black hover:bg-primary hover:text-white mt-8">
                  View User
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2 mx-0 md:mx-2 lg:mx-4 xl:mx-16">
              {/* Inventory card */}
              <div className="flex flex-col bg-white drop-shadow-xl rounded-md p-4 m-2 w-full  border border-gray-300 hover:border-blue-300  hover:bg-blue-50">
                <div className="flex items-center ">
                  <div className="flex items-center justify-start">
                    <MdInventory
                      size={60}
                      className="bg-primary p-3 rounded-xl text-white"
                    />
                  </div>
                  <div className="mx-6 flex-grow">
                    <div>
                      <p className="text-lg font-semibold">Inventory</p>
                      <p className="text-sm text-slate-500">Active User</p>
                    </div>
                  </div>
                  <p className="text-4xl flex-shrink-0 ml-auto font-semibold">
                    5
                  </p>
                </div>
                <button className="bg-white border border-primary p-1 rounded-md text-black hover:bg-primary hover:text-white mt-8">
                  View User
                </button>
              </div>

              {/* Reports card */}
              <div className="flex flex-col bg-white drop-shadow-xl rounded-md p-4 m-2 w-full border border-gray-300  hover:border-blue-300 hover:bg-blue-50">
                <div className="flex items-center ">
                  <div className="flex items-center justify-start">
                    <ImStatsBars
                      size={60}
                      className="bg-primary p-3 rounded-xl text-white"
                    />
                  </div>
                  <div className="mx-6 flex-grow">
                    <div>
                      <p className="text-lg font-semibold">Report</p>
                      <p className="text-sm text-slate-500">Active User</p>
                    </div>
                  </div>
                  <p className="text-4xl flex-shrink-0 ml-auto font-semibold">
                    5
                  </p>
                </div>
                <button className="bg-white border border-primary p-1 rounded-md text-black hover:bg-primary hover:text-white mt-8">
                  View User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
