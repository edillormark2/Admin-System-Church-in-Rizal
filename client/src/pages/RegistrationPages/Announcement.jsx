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
import { Divider } from "@mui/material";
import axios from "axios";
import { GoKebabHorizontal } from "react-icons/go";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import ActionPopup from "../../components/RegComponents/Announcement/ActionPopup";

const Announcement = () => {
  const { currentUser } = useSelector(state => state.user);
  const { activeMenu, setActiveMenu } = useStateContext();
  const [showLoader, setShowLoader] = useState(false);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [actionPopupOpen, setActionPopupOpen] = useState(false);
  const [placement, setPlacement] = React.useState("bottom-end");
  const [anchor, setAnchor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setShowLoader(true);
      const response = await axios.get(
        "http://localhost:3000/server/announcement/announcement-display"
      );

      setAnnouncements(response.data.announcements);
      setShowLoader(false);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setShowLoader(false);
    }
  };

  const handlePostCreated = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      await fetchAnnouncements();
      setIsLoading(false);
    }, 1000);
  };

  const handleOpenCreate = () => {
    setOpenCreatePopup(true);
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event, popupSetter) => {
    popupSetter(true);
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setActionPopupOpen(false);
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
                          Make an Announcement, {currentUser.name}?
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-4/5 mx-auto mt-8">
                      <p className="font-semibold mb-2">
                        Published Announcement
                      </p>
                    </div>
                    {/*Announcement Cards */}
                    {announcements.map(announcement =>
                      <div
                        className="w-full md:w-4/5 mx-auto mt-4"
                        key={announcement.id}
                      >
                        <div className="bg-white shadow-sm p-4 rounded-xl border border-gray-200">
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-row gap-4 mb-4">
                              <img
                                src={announcement.profilePicture}
                                alt="profile"
                                className="h-12 w-12 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-semibold">
                                  {announcement.name}
                                </p>
                                <div className="flex flex-row text-sm text-gray-500 gap-1">
                                  <p>{announcement.role}</p>•<p>{announcement.dateCreated}</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <GoKebabHorizontal
                                onClick={event =>
                                  handleClick(event, setActionPopupOpen)}
                                size={37}
                                className="cursor-pointer text-gray-600 hover:bg-gray-200 p-2 rounded-full drop-shadow-md"
                              />
                            </div>
                          </div>

                          <Divider />
                          <div className="my-4">
                            <p className="font-semibold mb-2">
                              {announcement.title}
                            </p>
                            <p>
                              {announcement.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>}
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
            <ActionPopup
              onClose={handleClose}
              buttonLink="/admin/manage-user/admin-user"
            />
          </BasePopup>
        </ClickAwayListener>}
      <CreatePopup
        openCreatePopup={openCreatePopup}
        setOpenCreatePopup={setOpenCreatePopup}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

export default Announcement;
