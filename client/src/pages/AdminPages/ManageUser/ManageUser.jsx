import React, { useState, useEffect } from "react";
import "../Admin.css";
import Navbar from "../../../components/AdminComponents/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar";
import { useStateContext } from "../../../redux/ContextProvider";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { ImStatsBars } from "react-icons/im";
import Breadcrumbs from "../../../components/Breadcrumbs";
import axios from "axios";
import { GoKebabHorizontal } from "react-icons/go";
import UserPopup from "../../../components/AdminComponents/ManageUser/UserPopup";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { ThreeDots } from "react-loader-spinner";

const ManageUser = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  const [adminCount, setAdminCount] = useState(0);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);
  const [anchor, setAnchor] = useState(null);
  const [adminPopupOpen, setAdminPopupOpen] = useState(false);
  const [regPopupOpen, setRegPopupOpen] = useState(false);
  const [inventoryPopupOpen, setInvPopupOpen] = useState(false);
  const [reportsPopupOpen, setReportsPopupOpen] = useState(false);
  const [placement, setPlacement] = React.useState("bottom-end");
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    fetchUserCounts();
  }, []);

  const fetchUserCounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/server/users/userCounts"
      );
      setAdminCount(response.data.Admin);
      setRegistrationCount(response.data.Registration);
      setInventoryCount(response.data.Inventory);
      setReportsCount(response.data.Reports);
      setLoading(false);
      setTimeout(() => {
        setShowLoader(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching user counts:", error);
      setLoading(false);
      setTimeout(() => {
        setShowLoader(false);
      }, 800);
    }
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  useEffect(
    () => {
      const handleOutsideClick = event => {
        if (
          anchor &&
          !anchor.contains(event.target) &&
          !event.target.closest(".action-popup")
        ) {
          setAdminPopupOpen(false);
          setRegPopupOpen(false);
          setInvPopupOpen(false);
          setReportsPopupOpen(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    },
    [anchor]
  );

  const handleClickAdmin = event => {
    setAdminPopupOpen(prev => !prev);
    setAnchor(event.currentTarget);
  };
  const handleClickReg = event => {
    setRegPopupOpen(prev => !prev);
    setAnchor(event.currentTarget);
  };
  const handleClickInv = event => {
    setInvPopupOpen(prev => !prev);
    setAnchor(event.currentTarget);
  };
  const handleClickReports = event => {
    setReportsPopupOpen(prev => !prev);
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAdminPopupOpen(false);
  };
  const handleCloseReg = () => {
    setRegPopupOpen(false);
  };
  const handleCloseInv = () => {
    setInvPopupOpen(false);
  };
  const handleCloseReports = () => {
    setReportsPopupOpen(false);
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
          className={` bg-gray-100 min-h-screen w-full md:flex-1 md:overflow-hidden ${activeMenu
            ? "lg:ml-60"
            : "flex-1"}`}
        >
          <div className="fixed md:static navbar w-full md:w-11/12 mx-auto rounded-md">
            <Navbar />
          </div>
          <div className="my-28 md:my-16 mx-10 md:mx-16 ">
            {showLoader
              ? <div className="p-16 mt-60 flex flex-col items-center">
                  <ThreeDots
                    visible={true}
                    height={80}
                    width={80}
                    color="#85929E"
                    radius={9}
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                  <p>Loading</p>
                </div>
              : <div>
                  <div className="mb-12">
                    <h1 className="text-2xl font-semibold mb-2 ">
                      Manage User
                    </h1>
                    <Breadcrumbs links={breadcrumbLinks} />
                  </div>
                  <div className="flex flex-col md:flex-row  mx-0 md:mx-2 lg:mx-4 xl:mx-16">
                    {/*Admin card */}
                    <div className="flex flex-col bg-white drop-shadow-xl rounded-md px-4 py-2 m-2 w-full border border-gray-300  hover:border-blue-300 hover:bg-blue-50">
                      <div className="flex justify-end">
                        <GoKebabHorizontal
                          onClick={event => handleClickAdmin(event)}
                          size={37}
                          className="cursor-pointer text-gray-500 hover:bg-gray-200 p-2 rounded-full drop-shadow-md"
                        />
                      </div>
                      <div className="flex items-center mb-4 ">
                        <div className="flex items-center justify-start">
                          <MdAdminPanelSettings
                            size={60}
                            className="bg-primary p-3 rounded-xl text-white"
                          />
                        </div>
                        <div className="mx-6 flex-grow">
                          <div>
                            <p className="text-lg font-semibold">Admin</p>
                            <p className="text-sm text-slate-500">
                              Active User
                            </p>
                          </div>
                        </div>
                        <p className="text-4xl flex-shrink-0 ml-auto font-semibold p-2">
                          {adminCount}
                        </p>
                      </div>
                      {adminPopupOpen &&
                        <BasePopup
                          id={id}
                          open={adminPopupOpen}
                          anchor={anchor}
                          placement={placement}
                          offset={4}
                          onClose={handleClose}
                        >
                          <div className="action-popup">
                            <UserPopup
                              onClose={handleClose}
                              buttonLink="/admin/manage-user/admin-user"
                            />
                          </div>
                        </BasePopup>}
                    </div>

                    {/* Registration card */}
                    <div className="flex flex-col bg-white drop-shadow-xl rounded-md p-4 m-2 w-full  border border-gray-300 hover:border-blue-300  hover:bg-blue-50">
                      <div className="flex justify-end">
                        <GoKebabHorizontal
                          onClick={event => handleClickReg(event)}
                          size={37}
                          className="cursor-pointer text-gray-500 hover:bg-gray-200 p-2 rounded-full drop-shadow-md"
                        />
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="flex items-center justify-start">
                          <FaClipboardList
                            size={60}
                            className="bg-primary p-3 rounded-xl text-white"
                          />
                        </div>
                        <div className="mx-6 flex-grow">
                          <div>
                            <p className="text-lg font-semibold">
                              Registration
                            </p>
                            <p className="text-sm text-slate-500">
                              Active User
                            </p>
                          </div>
                        </div>
                        <p className="text-4xl flex-shrink-0 ml-auto font-semibold p-2">
                          {registrationCount}
                        </p>
                      </div>
                      {regPopupOpen &&
                        <BasePopup
                          id={id}
                          open={regPopupOpen}
                          anchor={anchor}
                          placement={placement}
                          offset={4}
                          onClose={handleCloseReg}
                        >
                          <div className="action-popup">
                            <UserPopup
                              closePopup={handleCloseReg}
                              buttonLink="/admin/manage-user/registration-user"
                            />
                          </div>
                        </BasePopup>}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 mx-0 md:mx-2 lg:mx-4 xl:mx-16">
                    {/* Inventory card */}
                    <div className="flex flex-col bg-white drop-shadow-xl rounded-md p-4 m-2 w-full  border border-gray-300 hover:border-blue-300  hover:bg-blue-50">
                      <div className="flex justify-end">
                        <GoKebabHorizontal
                          onClick={event => handleClickInv(event)}
                          size={37}
                          className="cursor-pointer text-gray-500 hover:bg-gray-200 p-2 rounded-full drop-shadow-md"
                        />
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="flex items-center justify-start">
                          <MdInventory
                            size={60}
                            className="bg-primary p-3 rounded-xl text-white"
                          />
                        </div>
                        <div className="mx-6 flex-grow">
                          <div>
                            <p className="text-lg font-semibold">Inventory</p>
                            <p className="text-sm text-slate-500">
                              Active User
                            </p>
                          </div>
                        </div>
                        <p className="text-4xl flex-shrink-0 ml-auto font-semibold p-2">
                          {inventoryCount}
                        </p>
                      </div>
                      {inventoryPopupOpen &&
                        <BasePopup
                          id={id}
                          open={inventoryPopupOpen}
                          anchor={anchor}
                          placement={placement}
                          offset={4}
                          onClose={handleCloseInv}
                        >
                          <div className="action-popup">
                            <UserPopup
                              onClose={handleCloseInv}
                              buttonLink="/admin/manage-user/inventory-user"
                            />
                          </div>
                        </BasePopup>}
                    </div>

                    {/* Reports card */}
                    <div className="flex flex-col bg-white drop-shadow-xl rounded-md p-4 m-2 w-full border border-gray-300  hover:border-blue-300 hover:bg-blue-50">
                      <div className="flex justify-end">
                        <GoKebabHorizontal
                          onClick={event => handleClickReports(event)}
                          size={37}
                          className="cursor-pointer text-gray-500 hover:bg-gray-200 p-2 rounded-full drop-shadow-md"
                        />
                      </div>
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
                            <p className="text-sm text-slate-500">
                              Active User
                            </p>
                          </div>
                        </div>
                        <p className="text-4xl flex-shrink-0 ml-auto font-semibold p-2">
                          {reportsCount}
                        </p>
                      </div>
                      {reportsPopupOpen &&
                        <BasePopup
                          id={id}
                          open={reportsPopupOpen}
                          anchor={anchor}
                          placement={placement}
                          offset={4}
                          onClose={handleCloseReports}
                        >
                          <div className="action-popup">
                            <UserPopup
                              onClose={handleCloseReports}
                              buttonLink="/admin/manage-user/report-user"
                            />
                          </div>
                        </BasePopup>}
                    </div>
                  </div>
                </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
