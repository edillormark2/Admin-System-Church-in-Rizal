import React, { useState, useEffect } from "react";
import { BsPinAngleFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiUnpinFill } from "react-icons/ri";
import EditPopup from "./EditPopup";
import DeletePopup from "./DeletePopup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ActionPopup = ({
  onClose,
  selectedAnnouncementId,
  handlePostCreated,
  pinAnnouncement,
  isPinned,
}) => {
  const [openEditPopupLocal, setOpenEditPopupLocal] = useState(false);
  const [openDeletePopupLocal, setOpenDeletePopupLocal] = useState(false);

  useEffect(() => {
    // Update local storage when the state changes
    localStorage.setItem('editPopupOpen', JSON.stringify(openEditPopupLocal));
    localStorage.setItem('deletePopupOpen', JSON.stringify(openDeletePopupLocal));
  }, [openEditPopupLocal, openDeletePopupLocal]);

  useEffect(() => {
    // Retrieve state from local storage on component mount
    const editPopupOpen = localStorage.getItem('editPopupOpen');
    const deletePopupOpen = localStorage.getItem('deletePopupOpen');
    if (editPopupOpen) {
      setOpenEditPopupLocal(JSON.parse(editPopupOpen));
    }
    if (deletePopupOpen) {
      setOpenDeletePopupLocal(JSON.parse(deletePopupOpen));
    }
  }, []);

  const handlePin = () => {
    if (isPinned) {
      unpinAnnouncement(selectedAnnouncementId);
    } else {
      pinAnnouncement(selectedAnnouncementId);
    }
  };

  const unpinAnnouncement = async (announcementId) => {
    try {
      await axios.put(
        `http://localhost:3000/server/announcement/announcement-unpin/${announcementId}`
      );
      toast.success("Announcement has been unpinned");
      handlePostCreated();
    } catch (error) {
      console.error("Error unpinning announcement:", error);
    }
  };

  const handleOpenEdit = () => {
    setOpenEditPopupLocal(true);
  };

  const handleOpenDelete = () => {
    setOpenDeletePopupLocal(true);
    
  };

  const handleCloseEditDelete = () => {
    setOpenEditPopupLocal(false);
    setOpenDeletePopupLocal(false);
  };

  return (
    <>
      <div className="bg-white p-1 rounded-lg drop-shadow-lg border mt-1 border-gray-300 w-48 relative md:mt-0 ">
        <div
          onClick={handlePin}
          className="flex items-center w-full p-2 rounded-lg cursor-pointer my-1 hover:bg-gray-200"
        >
          <div className="w-10 flex justify-center items-center">
            {isPinned ? (
              <RiUnpinFill size={22} className="text-gray-700" />
            ) : (
              <BsPinAngleFill size={22} className="text-gray-700" />
            )}
          </div>
          <span className="ml-2 text-sm">
            {isPinned ? "Unpin Post" : "Pin Post"}
          </span>
        </div>
        <div
          onClick={handleOpenEdit}
          className="flex items-center w-full p-2 rounded-lg cursor-pointer my-1 hover:bg-gray-200"
        >
          <div className="w-10 flex justify-center items-center">
            <FaPen size={20} className="text-gray-700" />
          </div>
          <span className="ml-2 text-sm">Edit Post</span>
        </div>
        <div
          onClick={handleOpenDelete}
          className="flex items-center w-full p-2 rounded-lg cursor-pointer my-1 hover:bg-gray-200"
        >
          <div className="w-10 flex justify-center items-center">
            <MdDelete size={23} className="text-gray-700" />
          </div>
          <span className="ml-2 text-sm">Delete Post</span>
        </div>
      </div>

      <EditPopup
        openEditPopup={openEditPopupLocal}
        setOpenEditPopup={setOpenEditPopupLocal}
        _id={selectedAnnouncementId}
        onAnnouncementUpdated={handlePostCreated}
        onClose={handleCloseEditDelete} // Pass handleCloseEditDelete to EditPopup
      />
      <DeletePopup
        openDeletePopup={openDeletePopupLocal}
        setOpenDeletePopup={setOpenDeletePopupLocal}
        _id={selectedAnnouncementId}
        onAnnouncementDeleted={handlePostCreated}
        onClose={handleCloseEditDelete} // Pass handleCloseEditDelete to DeletePopup
      />
    </>
  );
};

export default ActionPopup;
