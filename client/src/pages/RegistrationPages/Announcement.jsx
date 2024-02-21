import React, { useState, useEffect } from "react";
import "./Reg.css";
import Navbar from "../../components/RegComponents/Navbar";
import Sidebar from "../../components/RegComponents/Sidebar";
import { useStateContext } from "../../redux/ContextProvider";
import Breadcrumbs from "../../components/Breadcrumbs";
import { ThreeDots } from "react-loader-spinner";

const Announcement = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  const [showLoader, setShowLoader] = useState(false);

  const breadcrumbLinks = [
    { to: "/registration/dashboard", label: "Home" },
    { to: "/announcement", label: "Announcement" }
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
                      Announcement
                    </h1>
                    <Breadcrumbs links={breadcrumbLinks} />
                  </div>
                </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
