import React, { useState, useEffect } from "react";
import "./Reg.css";
import Navbar from "../../components/RegComponents/Navbar";
import Sidebar from "../../components/RegComponents/Sidebar";
import { useStateContext } from "../../redux/ContextProvider";
import Breadcrumbs from "../../components/Breadcrumbs";
import { ThreeDots } from "react-loader-spinner";
import { GrAnnounce } from "react-icons/gr";
import announcement from "../../assets/mgp.png";
import { useSelector } from "react-redux";
import CreatePopup from "../../components/RegComponents/Announcement/CreatePopup";

const Announcement = () => {
  const { currentUser } = useSelector(state => state.user);
  const { activeMenu, setActiveMenu } = useStateContext();
  const [showLoader, setShowLoader] = useState(false);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  const handleOpenCreate = () => {
    setOpenCreatePopup(true);
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
          className={` bg-gray-100 min-h-screen w-full md:flex-1 md:overflow-hidden ${activeMenu
            ? "lg:ml-60"
            : "flex-1"}`}
        >
          <div className="fixed md:static navbar w-full md:w-11/12 mx-auto rounded-md z-10">
            <Navbar />
          </div>
          <div className="my-28 md:my-16 mx-4 md:mx-16 overflow-x-auto">
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
                  <div>
                    <div className="w-full mx-auto mb-8">
                      <div className="bg-gradient-to-r h-28  from-cyan-400 to-blue-500 shadow-lg  rounded-xl border border-gray-200">
                        <div className="flex flex-row gap-4 md:gap-8 items-center">
                          <img
                            src={announcement}
                            alt="announcement"
                            className="object-cover w-24 h-24 drop-shadow-2xl p-2 ml-4"
                          />

                          <p className="text-3xl md:text-4xl font-semibold text-white ">
                            Announcement
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white shadow-sm rounded-xl border border-gray-200 w-full md:w-4/5  mx-auto px-4 py-8">
                      <div className=" flex flex-row gap-4">
                        <img
                          src={currentUser.profilePicture}
                          alt="profile"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div
                          onClick={handleOpenCreate}
                          className="bg-gray-200 p-3 hover:bg-gray-300  cursor-pointer text-gray-500 rounded-full w-full"
                        >
                          Create Announcement
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
          </div>
        </div>
      </div>
      <CreatePopup
        openCreatePopup={openCreatePopup}
        setOpenCreatePopup={setOpenCreatePopup}
      />
    </div>
  );
};

export default Announcement;
