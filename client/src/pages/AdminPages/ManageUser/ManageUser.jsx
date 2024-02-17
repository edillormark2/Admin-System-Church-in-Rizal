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
import UserPopup from "../../../components/AdminComponents/UserPopup";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { ThreeDots } from "react-loader-spinner";

const ManageUser = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  const [adminCount, setAdminCount] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [adminPopupOpen, setAdminPopupOpen] = useState(false);
  const [regPopupOpen, setRegPopupOpen] = useState(false);
  const [inventoryPopupOpen, setInventoryPopupOpen] = useState(false);
  const [reportsPopupOpen, setReportsPopupOpen] = useState(false);
  const [placement, setPlacement] = React.useState("bottom-end");
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  useEffect(() => {
    fetchAdminCount();
  }, []);

  const fetchAdminCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/server/users/useradmin/count"
      );
      setAdminCount(response.data.count);
      setLoading(false);
      setTimeout(() => {
        setShowLoader(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching admin count:", error);
      setLoading(false);
      setTimeout(() => {
        setShowLoader(false);
      }, 800);
    }
  };

  const handleClick = (event, popupSetter) => {
    popupSetter(true);
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAdminPopupOpen(false);
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
                          onClick={event =>
                            handleClick(event, setAdminPopupOpen)}
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
                        <ClickAwayListener onClickAway={handleClose}>
                          <BasePopup
                            id={id}
                            open={Boolean(anchor)}
                            anchor={anchor}
                            placement={placement}
                            offset={4}
                            onClose={handleClose}
                          >
                            <UserPopup
                              onClose={handleClose}
                              buttonLink="/admin/manage-user/admin-user"
                            />
                          </BasePopup>
                        </ClickAwayListener>}
                    </div>

                    {/* Registration card */}
                    <div className="flex flex-col bg-white drop-shadow-xl rounded-md p-4 m-2 w-full  border border-gray-300 hover:border-blue-300  hover:bg-blue-50">
                      <div className="flex justify-end">
                        <GoKebabHorizontal
                          onClick={event => handleClick(event, setRegPopupOpen)}
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
                          7
                        </p>
                      </div>
                      {regPopupOpen &&
                        <BasePopup
                          id={id}
                          open={Boolean(anchor)}
                          anchor={anchor}
                          placement={placement}
                          offset={4}
                          onClose={() => handleClose(setRegPopupOpen)}
                        >
                          <UserPopup
                            closePopup={() => handleClose(setRegPopupOpen)}
                            buttonLink="/admin/manage-user/registration-user"
                          />
                        </BasePopup>}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 mx-0 md:mx-2 lg:mx-4 xl:mx-16">
                    {/* Inventory card */}
                    <div className="flex flex-col bg-white drop-shadow-xl rounded-md p-4 m-2 w-full  border border-gray-300 hover:border-blue-300  hover:bg-blue-50">
                      <div className="flex justify-end">
                        <GoKebabHorizontal
                          onClick={event =>
                            handleClick(event, setInventoryPopupOpen)}
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
                          5
                        </p>
                      </div>
                      {inventoryPopupOpen &&
                        <BasePopup
                          id={id}
                          open={Boolean(anchor)}
                          anchor={anchor}
                          placement={placement}
                          offset={4}
                          onClose={() => handleClose(setInventoryPopupOpen)}
                        >
                          <UserPopup
                            onClose={() => handleClose(setInventoryPopupOpen)}
                            buttonLink="/admin/manage-user/inventory-user"
                          />
                        </BasePopup>}
                    </div>

                    {/* Reports card */}
                    <div className="flex flex-col bg-white drop-shadow-xl rounded-md p-4 m-2 w-full border border-gray-300  hover:border-blue-300 hover:bg-blue-50">
                      <div className="flex justify-end">
                        <GoKebabHorizontal
                          onClick={event =>
                            handleClick(event, setReportsPopupOpen)}
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
                          5
                        </p>
                      </div>
                      {reportsPopupOpen &&
                        <BasePopup
                          id={id}
                          open={Boolean(anchor)}
                          anchor={anchor}
                          placement={placement}
                          offset={4}
                          onClose={() => handleClose(setReportsPopupOpen)}
                        >
                          <UserPopup
                            onClose={() => handleClose(setReportsPopupOpen)}
                            buttonLink="/admin/manage-user/reports-user"
                          />
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
