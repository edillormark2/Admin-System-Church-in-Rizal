import React, { useState, useEffect } from "react";
import "./Reg.css";
import Navbar from "../../components/RegComponents/Navbar";
import Sidebar from "../../components/RegComponents/Sidebar";
import { useStateContext } from "../../redux/ContextProvider";
import Breadcrumbs from "../../components/Breadcrumbs";
import { ThreeDots } from "react-loader-spinner";
import { GrAnnounce } from "react-icons/gr";
import announcement from "../../assets/mgp.png";
import noannouncement from "../../assets/empty.png";
import { useSelector } from "react-redux";
import CreatePopup from "../../components/RegComponents/Announcement/CreatePopup";
import { Divider } from "@mui/material";
import axios from "axios";
import { GoKebabHorizontal } from "react-icons/go";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActionPopup from "../../components/RegComponents/Announcement/ActionPopup";

const Announcement = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { activeMenu, setActiveMenu } = useStateContext();
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [actionPopupOpen, setActionPopupOpen] = useState(false);
  const [placement, setPlacement] = useState("bottom-end");
  const [anchor, setAnchor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/server/announcement/announcement-display"
      );
      setAnnouncements(response.data.announcements);
      setLoading(false);
      setTimeout(() => {
        setShowLoader(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setShowLoader(false);
    }
  };

  const handlePostCreated = async () => {
    setActionPopupOpen(false);
    setShowLoader(true);
    setTimeout(async () => {
      await fetchAnnouncements();
      setShowLoader(false);
    }, 800);
  };

  const handleOpenCreate = () => {
    setOpenCreatePopup(true);
  };

  useEffect(() => {
    const handleOutsideClick = event => {
      const editPopupOpen = localStorage.getItem('editPopupOpen') === 'true';
      const deletePopupOpen = localStorage.getItem('deletePopupOpen') === 'true';
      // Check if both editPopupOpen and deletePopupOpen are false
      if (!editPopupOpen && !deletePopupOpen) {
        if (
          anchor &&
          !anchor.contains(event.target) &&
          !event.target.closest(".action-popup")
        ) {
          setActionPopupOpen(false);
        }
      }
    };
  
    document.addEventListener("mousedown", handleOutsideClick);
  
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [anchor]);
  
  
  const handleClick = (event, announcementId) => {
    setActionPopupOpen(prev => !prev);
    setAnchor(event.currentTarget);
    setSelectedAnnouncementId(announcementId);
  };

  const handleClose = () => {
    setActionPopupOpen(false);
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  const pinAnnouncement = async (announcementId) => {
    try {
      const announcementToUpdate = announcements.find(
        (announcement) => announcement._id === announcementId
      );
      if (announcementToUpdate) {
        let updatedPinnedStatus = !announcementToUpdate.pinned; // Toggle the pinned status
        await axios.put(
          `http://localhost:3000/server/announcement/announcement-pin/${announcementId}`,
          { pinned: updatedPinnedStatus }
        );
        setActionPopupOpen(false);
        toast(
          updatedPinnedStatus
            ? "Announcement has been pinned"
            : "Announcement has been unpinned"
        );
        handlePostCreated(); // Refresh announcements after pinning or unpinning
      } else {
        console.error("Announcement not found for id:", announcementId);
      }
    } catch (error) {
      console.error("Error updating announcement pinned status:", error);
    }
  };


  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex relative ">
        {activeMenu ? (
          <div className="w-64 fixed sidebar drop-shadow-xl bg-gray-100">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 drop-shadow-xl bg-gray-100">
            <Sidebar />
          </div>
        )}
        <div
          className={` bg-gray-100 min-h-screen w-full md:flex-1 md:overflow-hidden ${
            activeMenu ? "lg:ml-60" : "flex-1"
          }`}
        >
          <div className="fixed md:static navbar w-full md:w-11/12 mx-auto rounded-md z-10">
            <Navbar />
          </div>
          <div className="my-28 md:my-16 mx-4 md:mx-16 overflow-x-auto">
            <div>
              <div>
                <div className="w-full mx-auto mb-8">
                  <div className="bg-gradient-to-r h-28  from-cyan-400 to-blue-500 shadow-lg  rounded-xl border border-gray-200">
                    <div className="flex flex-row gap-4 md:gap-8 items-center">
                      <img
                        src={announcement}
                        alt="announcement"
                        className="object-cover w-20 md:w-24 h-20 md:h-24 drop-shadow-2xl p-2 ml-6 "
                      />
                      <p className="text-2xl md:text-4xl font-semibold text-white ">
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
                      className="bg-gray-200 p-3 hover:bg-gray-300  cursor-pointer text-gray-500 rounded-full w-full text-sm md:text-base"
                    >
                      Make an Announcement, {currentUser.name}?
                    </div>
                  </div>
                </div>
                {showLoader ? (
                  <div className="p-16 mt-20 flex flex-col items-center">
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
                ) : announcements.length === 0 ? (
                  <div className="flex flex-col justify-center items-center mx-auto my-8">
                    <img
                      src={noannouncement}
                      alt="noannouncement"
                      className="object-contain w-1/2 h-80"
                    />
                    <p className="text-md my-4 ">
                      No announcements have been posted
                    </p>
                  </div>
                ) : (
                  <div>
                    {announcements.some((announcement) => announcement.pinned) && ( 
                      <div className="w-full md:w-4/5 mx-auto mt-8">
                        <p className="font-semibold text-gray-500">Pinned Announcements</p>
                        {announcements
                          .filter((announcement) => announcement.pinned)
                          .map((announcement) => (
                            <div  className="mt-4" key={announcement._id}>
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
                                        <p>{announcement.role}</p>•
                                        <p>{announcement.dateCreated}</p>
                                      </div>
                                    </div>
                                  </div>
                                  {currentUser.userID === announcement.userID && ( // Check if the currentUser's userID matches the announcement's userID
                                    <div>
                                      <GoKebabHorizontal  
                                        onClick={(event) => handleClick(event, announcement._id)}
                                        size={37}
                                        className="cursor-pointer text-gray-600 hover:bg-gray-200 p-2 rounded-full drop-shadow-md"
                                      />
                                    </div>
                                  )}
                                </div>
                                <Divider />
                                <div className="my-4">
                                  <p className="font-semibold mb-2">
                                    {announcement.title}
                                  </p>
                                  <p>{announcement.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                    <div className="w-full md:w-4/5 mx-auto mt-8">
                      {announcements.some((announcement) => announcement.pinned) && ( // Conditionally render based on the presence of other announcements
                        <p className="font-semibold  text-gray-500">Other Announcements</p>
                      )}
                      {announcements
                        .filter((announcement) => !announcement.pinned)
                        .map((announcement) => (
                          <div
                            className="mt-4"
                            key={announcement._id}
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
                                      <p>{announcement.role}</p>•
                                      <p>{announcement.dateCreated}</p>
                                    </div>
                                  </div>
                                </div>
                                {currentUser.userID === announcement.userID && ( // Check if the currentUser's userID matches the announcement's userID
                                  <div>
                                    <GoKebabHorizontal
                                      onClick={(event) => handleClick(event, announcement._id)}
                                      size={37}
                                      className="cursor-pointer text-gray-600 hover:bg-gray-200 p-2 rounded-full drop-shadow-md"
                                    />
                                  </div>
                                )}
                              </div>
                              <Divider />
                              <div className="my-4">
                                <p className="font-semibold mb-2">
                                  {announcement.title}
                                </p>
                                <p>{announcement.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {actionPopupOpen &&
  <BasePopup
    id={id}
    open={actionPopupOpen}
    anchor={anchor}
    placement={placement}
    offset={4}
    onClose={handleClose}
  >
    <div className="action-popup">
      <ActionPopup
        onClose={handleClose}
        selectedAnnouncementId={selectedAnnouncementId}
        handlePostCreated={handlePostCreated}
        pinAnnouncement={pinAnnouncement}
        isPinned={announcements.find(
          (announcement) => announcement._id === selectedAnnouncementId
        )?.pinned} 
      />
    </div>
  </BasePopup>}

      <CreatePopup
        openCreatePopup={openCreatePopup}
        setOpenCreatePopup={setOpenCreatePopup}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

export default Announcement;
