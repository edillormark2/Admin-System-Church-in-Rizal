import React from "react";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";

const ActionPopup = ({ closePopup, buttonLink }) => {
  return (
    <div className="bg-white p-1 rounded-lg drop-shadow-xl border mt-1 border-gray-300 w-52 relative md:mt-0">
      <div className="flex items-center w-full p-2 mb-1 rounded-lg cursor-pointer hover:bg-gray-200">
        <div className="  w-10 flex justify-center items-center">
          <FaBookOpen size={22} className="text-gray-700" />
        </div>
        <span className="ml-2 text-sm">Open Registration</span>
      </div>
      <div className="flex items-center w-full p-2 mb-1 rounded-lg cursor-pointer hover:bg-gray-200">
        <div className="  w-10 flex justify-center items-center">
          <FaEye size={22} className="text-gray-700" />
        </div>
        <span className="ml-2 text-sm">View Registrants</span>
      </div>
      <div className="flex items-center w-full p-2 mb-1 rounded-lg cursor-pointer hover:bg-gray-200">
        <div className="  w-10 flex justify-center items-center">
          <MdEdit size={22} className="text-gray-700" />
        </div>
        <span className="ml-2 text-sm">Edit Details</span>
      </div>
    </div>
  );
};

export default ActionPopup;
