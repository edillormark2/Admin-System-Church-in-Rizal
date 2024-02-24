import React, { useState, useEffect } from "react";
import "./Reg.css";
import Navbar from "../../components/RegComponents/Navbar";
import Sidebar from "../../components/RegComponents/Sidebar";
import { useStateContext } from "../../redux/ContextProvider";
import { GoKebabHorizontal } from "react-icons/go";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ActionPopup from "../../components/RegComponents/ManageReg/ActionPopup";
import { Divider } from "@mui/material";

const ManageRegForm = () => {
  const { activeMenu } = useStateContext();
  const [actionPopupOpen, setActionPopupOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [placement, setPlacement] = React.useState("bottom-end");

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event, popupSetter) => {
    popupSetter(true);
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setActionPopupOpen(false);
  };

  const regCardData = [
    {
      status: "Open",
      title: "Summer School of Truth"
    },
    {
      status: "Closed",
      title: "Coordinators Meeting"
    },
    {
      status: "Closed",
      title: "Bible Reading"
    },
    {
      status: "Closed",
      title: "Tour of a Lifetime"
    },
    {
      status: "Closed",
      title: "Combine Young People's Meeting"
    },
    {
      status: "Closed",
      title: "Combined Lord's Table Meeting"
    },
    {
      status: "Closed",
      title: "Fellowship Among the Churches"
    },
    {
      status: "Closed",
      title: "Family Day"
    }
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
            <div className="mb-12">
              <h1 className="text-2xl font-semibold mb-2 ">
                Manage Registration
              </h1>
              <div className="w-full flex flex-wrap mt-8">
                {regCardData.map((card, index) =>
                  <div
                    key={index}
                    className="w-full  sm:w-full lg:w-1/2  2xl:w-1/3 p-2"
                  >
                    <div
                      className={`relative bg-white hover:bg-blue-50  rounded-md drop-shadow-xl p-2 border  ${card.status ===
                      "Open"
                        ? "border-green-400"
                        : "border-gray-300"} w-full h-48`}
                    >
                      <p
                        className={`absolute top-4 left-2 ${card.status ===
                        "Open"
                          ? "bg-green-400"
                          : "bg-gray-400"} text-white py-1 px-2 rounded-md text-xs `}
                      >
                        {card.status}
                      </p>
                      <div className="flex justify-end">
                        <GoKebabHorizontal
                          onClick={event =>
                            handleClick(event, setActionPopupOpen)}
                          size={37}
                          className="cursor-pointer text-gray-600 hover:bg-gray-200 p-2 rounded-full drop-shadow-md mb-4"
                        />
                      </div>
                      <Divider />
                      <div className="flex justify-between  0 p-4 rounded-xl mt-0 mb-2">
                        <div className="flex flex-col my-2 pt-2">
                          <p className="text-black font-semibold text-sm">
                            {card.title}
                          </p>
                          <p className="text-gray-500 text-xl font-semibold">
                            Currently Registered
                          </p>
                        </div>
                        <div className="my-auto text-black text-4xl font-semibold pt-2">
                          0
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {actionPopupOpen &&
        <ClickAwayListener onClickAway={handleClose}>
          <BasePopup
            id={id}
            open={Boolean(anchor)}
            anchor={anchor}
            placement={placement}
            offset={4}
            onClose={handleClose}
          >
            <ActionPopup onClose={handleClose} />
          </BasePopup>
        </ClickAwayListener>}
    </div>
  );
};

export default ManageRegForm;
