import React, { useState } from "react";
import { BsPinAngleFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiUnpinFill } from "react-icons/ri"; // Import RiPushpin2Fill and RiPushpinFill for pinned and unpinned icons
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
  isPinned
}) => {
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const handlePin = () => {
    if (isPinned) {
      unpinAnnouncement(selectedAnnouncementId);
    } else {
      pinAnnouncement(selectedAnnouncementId);
    }
  };

  const unpinAnnouncement = async announcementId => {
    try {
      // Implement logic to unpin announcement
      await axios.put(
        `http://localhost:3000/server/announcement/announcement-unpin/${announcementId}`
      );
      toast.success("Announcement has been unpinned");
      handlePostCreated(); // Refresh announcements after unpinning
    } catch (error) {
      console.error("Error unpinning announcement:", error);
    }
  };

  const handleOpenEdit = () => {
    setOpenEditPopup(true);
  };

  const handleOpenDelete = () => {
    setOpenDeletePopup(true);
  };

  return (
    <div className="bg-white p-1 rounded-lg drop-shadow-lg border mt-1 border-gray-300 w-48 relative md:mt-0 ">
      <div
        onClick={handlePin}
        className="flex items-center w-full p-2 rounded-lg cursor-pointer my-1 hover:bg-gray-200"
      >
        <div className="  w-10 flex justify-center items-center">
          {/* Use RiPushpinFill for pinned and RiPushpin2Fill for unpinned */}
          {isPinned
            ? <RiUnpinFill size={22} className="text-gray-700" />
            : <BsPinAngleFill size={22} className="text-gray-700" />}
        </div>
        <span className="ml-2 text-sm">
          {isPinned ? "Unpin Post" : "Pin Post"}
        </span>
      </div>
      <div
        onClick={handleOpenEdit}
        className="flex items-center w-full p-2 rounded-lg cursor-pointer my-1 hover:bg-gray-200"
      >
        <div className="  w-10 flex justify-center items-center">
          <FaPen size={20} className="text-gray-700" />
        </div>
        <span className="ml-2 text-sm">Edit Post</span>
      </div>
      <div
        onClick={handleOpenDelete}
        className="flex items-center w-full p-2 rounded-lg cursor-pointer my-1 hover:bg-gray-200"
      >
        <div className="  w-10 flex justify-center items-center">
          <MdDelete size={23} className="text-gray-700" />
        </div>
        <span className="ml-2 text-sm">Delete Post</span>
      </div>
      <EditPopup
        openEditPopup={openEditPopup}
        setOpenEditPopup={setOpenEditPopup}
        _id={selectedAnnouncementId}
        onAnnouncementUpdated={handlePostCreated}
      />
      <DeletePopup
        openDeletePopup={openDeletePopup}
        setOpenDeletePopup={setOpenDeletePopup}
        _id={selectedAnnouncementId}
        onAnnouncementDeleted={handlePostCreated}
      />
    </div>
  );
};

export default ActionPopup;
