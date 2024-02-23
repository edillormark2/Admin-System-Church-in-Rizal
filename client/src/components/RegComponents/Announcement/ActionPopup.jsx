import React from "react";
import { Link } from "react-router-dom";
import { BsPinAngleFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ActionPopup = ({ closePopup, buttonLink }) => {
  return (
    <div className="bg-white p-1 rounded-lg drop-shadow-lg border mt-1 border-gray-300 w-48 relative md:mt-0 ">
      <Link to={buttonLink}>
        <div className="flex items-center w-full p-2 rounded-lg cursor-pointer my-1 hover:bg-gray-200">
          <div className="  w-10 flex justify-center items-center">
            <BsPinAngleFill size={22} className="text-gray-700" />
          </div>
          <span className="ml-2 text-sm">Pin Post</span>
        </div>
        <div className="flex items-center w-full p-2 rounded-lg cursor-pointer my-1 hover:bg-gray-200">
          <div className="  w-10 flex justify-center items-center">
            <FaPen size={20} className="text-gray-700" />
          </div>
          <span className="ml-2 text-sm">Edit Post</span>
        </div>
        <div className="flex items-center w-full p-2 rounded-lg cursor-pointer my-1 hover:bg-gray-200">
          <div className="  w-10 flex justify-center items-center">
            <MdDelete size={23} className="text-gray-700" />
          </div>
          <span className="ml-2 text-sm">Delete Post</span>
        </div>
      </Link>
    </div>
  );
};

export default ActionPopup;
